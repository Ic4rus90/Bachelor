from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from prefect import flow, task
from loguru import logger
import os
import uvicorn
import requests

app = FastAPI()

validator_url = "http://localhost:8200/check-syntax"

class CodeAnalysisRequest(BaseModel):
    code: str
    file_extension: str
    token: str

class SyntaxCheckRequest(BaseModel):
    file_extension: str
    code: str
def set_up_logger():
    cur_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.dirname(cur_dir)
    logs_dir = os.path.join(parent_dir, "logs")
    os.makedirs(logs_dir, exist_ok=True)
    log_file_path = os.path.join(logs_dir, "workflow.log")
    logger.add(log_file_path, format="{time:YYYY-MM-DD HH:mm:ss.ms} {extra} {level} {message} ", rotation="50 MB", enqueue=True)


# STUB for testing only!
@task
def validate_token_task(token: str) -> bool:
    logger.info("Validating user token")
    if token != "valid_token":
        logger.error("Token is invalid")
        raise ValueError("Invalid token")
    logger.info("Token is valid")
    return True

@task
def generate_prompt_code_validator_task(code: str, file_extension: str) -> str:
    validation_request = SyntaxCheckRequest(file_extension=file_extension, code=code)
    request_data = validation_request.dict()
    logger.info("Sending code to code validator")
    try:
        response = requests.post(validator_url, json=request_data)
        response.raise_for_status()
        validation_result = response.json()
        logger.info(f"Code validation result: {validation_result}")
        return validation_result
    except requests.HTTPError as e:
        logger.error(f"Request to code validator failed: {e.response.status_code} - {e.response.text}")
        raise ValueError(f"Code validation failed: {e.response.text}")
    except requests.RequestException as e:
        logger.error(f"Request to code validator failed {e}")
        raise ValueError("Code validation failed due to a network or server error")

@task
def call_llm_task(prompt: str) -> str:
    logger.info("Calling LLM model to analyze code")

    logger.info("LLM output received")
    return "LLM output"

@task
def generate_report_task(llm_output: str) -> str:
    logger.info("Sending LLM output to generate report summary")

    logger.info("Report summary generated")
    return "Report summary generated"

@task
def store_report_task(llm_output: str) -> str:
    logger.info("Sending report to web-app for storage")

    logger.info("Report stored successfully")
    return "Report stored succesfully"


@flow
def code_analysis_flow(code: str, file_extension: str, token: str):
    if validate_token_task(token):
        prompt = generate_prompt_code_validator_task(code, file_extension)
        llm_output = call_llm_task(prompt)
        report_summary = generate_report_task(llm_output)
        storage_result = store_report_task(llm_output)
        return report_summary

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
        except Exception as e:
            logger.error(f"Error occurred while analyzing code: {e}")
            raise HTTPException(status_code=500, detail="Internal server error occurred while analyzing code")

set_up_logger()

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)