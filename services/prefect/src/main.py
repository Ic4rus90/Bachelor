from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from prefect import flow, task
from loguru import logger
import os
import uvicorn

app = FastAPI()

class CodeAnalysisRequest(BaseModel):
    code: str
    file_extension: str
    token: str

def set_up_logger():
    cur_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.dirname(cur_dir)
    logs_dir = os.path.join(parent_dir, "logs")
    os.makedirs(logs_dir, exist_ok=True)
    log_file_path = os.path.join(logs_dir, "workflow.log")
    logger.add(log_file_path, rotation="50 MB", enqueue=True)

@task
def validate_token_task(token: str) -> bool:
    if token != "valid_token":
        logger.error("Invalid token")
        raise ValueError("Invalid token")
    return True

@task
def generate_prompt_code_validator_task(code: str, file_extension: str) -> str:
    return "This is the prompt"

@task
def call_llm_task(prompt: str) -> str:
    return "LLM output"

@task
def generate_report_task(llm_output: str) -> str:
    return "Report summary generated"

@task
def store_report_task(llm_output: str, report_summary: str) -> str:
    return "Report and summary stored"

@flow
def code_analysis_flow(code: str, file_extension: str, token: str):
    if validate_token_task(token):
        prompt = generate_prompt_code_validator_task(code, file_extension)
        llm_output = call_llm_task(prompt)
        report_summary = generate_report_task(llm_output)
        storage_result = store_report_task(llm_output, report_summary)
        return storage_result

@app.post("/analyze-code/")
async def analyze_code_endpoint(request: CodeAnalysisRequest):
    try:
        result = code_analysis_flow(code=request.code, file_extension=request.file_extension, token=request.token)
        return {"summary": result}
    except Exception as e:
        logger.error(f"Error occurred while analyzing code: {e}")
        raise HTTPException(status_code=500, detail="Error occurred while analyzing code. Please try again later.")

set_up_logger()

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)