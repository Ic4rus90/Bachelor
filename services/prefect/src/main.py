from fastapi import FastAPI, HTTPException, Request, Response
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from prefect import flow
from tasks import validate_token_task, generate_prompt_code_validator_task, call_llm_task, generate_report_task, store_report_task, get_user_id_task
from logger import logger, set_up_logger
from models import CodeAnalysisRequest
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from config import RATE_LIMIT, ALLOWED_CODE_LENGTH


# Sets up logging
logger.remove()
set_up_logger()


app = FastAPI(root_path="/analyze-code/")

# Trust requests coming through the Nginx proxy
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=["cair-gpu12.uia.no", "*.cair-gpu12.uia.no"]
)

# Set up the rate limiter
limiter = Limiter(key_func=get_remote_address, default_limits=["1/minute"])
app.state.limiter = limiter
# Custom exception handler for rate limits
async def custom_rate_limit_exceeded_handler(request: Request, exc: RateLimitExceeded):
    client_host = request.client.host
    logger.error(f"Rate limit exceeded for client: {client_host}")
    return Response(content="Rate limit exceeded", status_code=429)
app.add_exception_handler(RateLimitExceeded, custom_rate_limit_exceeded_handler)


# Prefect flow for code analysis
@flow(name="Code Analysis Flow")
async def code_analysis_flow(code: str, file_extension: str, token: str, line_number: int):
    # 1. Validates token
    valid_token = await validate_token_task(token)
    if valid_token:
        # 2. Gets user ID
        user_id = await get_user_id_task(token)
        if user_id == "":
            logger.error("Invalid token received, could not extract user ID")
            raise ValueError("Invalid token received")
        
        #3. Check the code length
        if len(code) > ALLOWED_CODE_LENGTH:
            logger.error(f"Client: {user_id} Code length exceeds maximum limit")
            raise ValueError("Code too long")

        # 4. Validate code and get prompt for LLM
        prompt = await generate_prompt_code_validator_task(user_id=user_id, code=code, file_extension=file_extension)

        # 5. Call the LLM and get the JSON response
        llm_output = await call_llm_task(user_id=user_id, prompt=prompt)

        # 6. Call the report generator to transform response into two reports.
        reports = await generate_report_task(user_id=user_id, llm_output = llm_output, file_extension = file_extension, analyzed_code = code, starting_line_number = line_number)
        
        # 7. Store the full report in the database
        storage_result = await store_report_task(user_id=user_id, report_full=reports.encoded_full)
        if storage_result:
            logger.info(f"Client: {user_id} Returning the summary to the extension")
            return reports.encoded_summary
        else:
            logger.error(f"Client: {user_id} Could not store the full report")
            raise ValueError("Error storing full report")
    else:
        logger.error("Invalid token received")
        raise ValueError("Invalid token received")        
    
# Endpoint to handle code analysis requests
@app.post("/api/analyze-code")
@limiter.limit(RATE_LIMIT)
async def analyze_code_endpoint(request: Request, code_analysis_request: CodeAnalysisRequest):
    client_host = request.client.host

    # Extract authorization token first:
    authorization: str = request.headers.get("Authorization")
    if authorization and authorization.startswith("Bearer "):
        token = authorization[7:]
        print(token)
    else:
        raise HTTPException(status_code=401, detail="Invalid authorization bearer received")

    logger.info(f"Client: {client_host} Received code analysis request: {code_analysis_request}")
    try:

        # Run the code analysis flow
        result = await code_analysis_flow(code=code_analysis_request.code, 
                                    file_extension=code_analysis_request.file_extension, 
                                    token=token,
                                    line_number=code_analysis_request.line_number)

        return result
    except ValueError as e: # Handle specific errors with appropriate HTTP status codes
        if str(e) == "Invalid token received": 
            logger.error(f"Client: {client_host} Raised 401 due to invalid token")
            raise HTTPException(status_code=401, detail="Invalid token received")
        elif str(e) == "Invalid code received": 
            logger.error(f"Client: {client_host} Raised 400 due to invalid code")
            raise HTTPException(status_code=400, detail="Invalid code received")
        elif str(e) == "Invalid file extension received": 
            logger.error(f"Client: {client_host} Raised 422 due to invalid file extension")
            raise HTTPException(status_code=422, detail="Invalid file extension received")
        elif str(e) == "Code too long":
            logger.error(f"Client: {client_host} Raised 413 due to code too long")
            raise HTTPException(status_code=418, detail="Code too long")
        else:
            logger.error(f"Client: {client_host} Raised 500 due to unknown error: {e}")
            raise HTTPException(status_code=500, detail="Server error occurred, please contact us for assistance.")
    except Exception as e:
        logger.error(f"Client: {client_host} Raised 500 due to unknown error: {e}")
        raise HTTPException(status_code=500, detail="Server error occurred, please contact us for assistance.")
        

# Entry point for running the application
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=30000)
    
