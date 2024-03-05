from fastapi import FastAPI, HTTPException, Request
from prefect import flow
from tasks import validate_token_task, generate_prompt_code_validator_task, call_llm_task, generate_report_task, store_report_task
from logger import logger, set_up_logger
from models import CodeAnalysisRequest


app = FastAPI()


@flow(name="Code Analysis Flow")
def code_analysis_flow(code: str, file_extension: str, token: str):
    if validate_token_task(token):
        prompt = generate_prompt_code_validator_task(code, file_extension)
        llm_output = call_llm_task(prompt)
        report_summary = generate_report_task(llm_output)
        storage_result = store_report_task(llm_output)
        return report_summary
    else:
        logger.error("Error validating token")
        raise ValueError("Error validating token")

@app.post("/analyze-code/")
async def analyze_code_endpoint(request: Request, code_analysis_request: CodeAnalysisRequest):
    client_host = request.client.host
    with logger.contextualize(client_host=client_host):
        logger.info(f"Received code analysis request: {code_analysis_request}")
        try:
            result = code_analysis_flow(code=code_analysis_request.code, 
                                        file_extension=code_analysis_request.file_extension, 
                                        token=code_analysis_request.token)

            return {"summary": result}
        except ValueError as e:
            if str(e) == "Invalid token received": # If token is invalid
                logger.error("Raised 401 due to invalid token")
                raise HTTPException(status_code=401, detail="Invalid token received")
            elif str(e) == "Invalid code received": # If the code received is invalid
                logger.error("Raised 400 due to invalid code")
                raise HTTPException(status_code=400, detail="Invalid code received")
            elif str(e) == "Invalid file extension received": # If an invalid file extension is received
                logger.error("Raised 422 due to invalid file extension")
                raise HTTPException(status_code=422, detail="Invalid file extension received")
            else:
                logger.error("Raised 500 due to unknown error")
                raise HTTPException(status_code=500, detail="Server error occurred, please contact us for assistance.")

set_up_logger()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=30000, reload=True)