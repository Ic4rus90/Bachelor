from fastapi import FastAPI, HTTPException, Request
from prefect import flow
from tasks import validate_token_task, generate_prompt_code_validator_task, call_llm_task, generate_report_task, store_report_task, get_user_id_task
from logger import logger, set_up_logger
from models import CodeAnalysisRequest


app = FastAPI()


set_up_logger()


@flow(name="Code Analysis Flow")
def code_analysis_flow(code: str, file_extension: str, token: str):
    validate_token_task(token)
    if validate_token_task:
        user_id = get_user_id_task(token)
        if user_id == "":
            logger.error("Invalid token received, could not extract user ID")
            raise ValueError("Invalid token received")
        prompt = generate_prompt_code_validator_task(user_id=user_id, code=code, file_extension=file_extension)
        llm_output = call_llm_task(user_id=user_id, prompt=prompt)
        reports = generate_report_task(user_id=user_id, llm_output = llm_output, file_extension = file_extension, analyzed_code = code, starting_line_number = 1)
        storage_result = store_report_task(user_id=user_id, report_full=reports.encoded_full)
        if storage_result:
            print("Full-report: " + reports.encoded_full)
            print("Summary: " + reports.encoded_summary)
            return reports.encoded_summary
        else:
            logger.error(f" {user_id} Could not store the full report")
            raise ValueError("Error storing full report")
    else:
        logger.error("Invalid token received")
        raise ValueError("Invalid token received")        
    

@app.post("/analyze-code/")
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
        result = code_analysis_flow(code=code_analysis_request.code, 
                                    file_extension=code_analysis_request.file_extension, 
                                    token=token)

        return result
    except ValueError as e:
        if str(e) == "Invalid token received": # If token is invalid
            logger.error(f"Client: {client_host} Raised 401 due to invalid token")
            raise HTTPException(status_code=401, detail="Invalid token received")
        elif str(e) == "Invalid code received": # If the code received is invalid
            logger.error(f"Client: {client_host} Raised 400 due to invalid code")
            raise HTTPException(status_code=400, detail="Invalid code received")
        elif str(e) == "Invalid file extension received": # If an invalid file extension is received
            logger.error(f"Client: {client_host} Raised 422 due to invalid file extension")
            raise HTTPException(status_code=422, detail="Invalid file extension received")
        else:
            logger.error(f"Client: {client_host} Raised 500 due to unknown error: {e}")
            raise HTTPException(status_code=500, detail="Server error occurred, please contact us for assistance.")
    except Exception as e:
        logger.error(f"Client: {client_host} Raised 500 due to unknown error: {e}")
        raise HTTPException(status_code=500, detail="Server error occurred, please contact us for assistance.")
        

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=30000)