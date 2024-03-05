from fastapi import FastAPI, HTTPException, Request
from prefect import flow, task
from logger import logger, set_up_logger
from models import TokenRequest, CodeAnalysisRequest, SyntaxCheckRequest, LLMRequest
from config import TOKEN_VALIDATOR_URL, CODE_VALIDATOR_URL, LLM_URL, REPORT_GENERATOR_URL, REPORT_STORAGE_URL
import uvicorn
import requests


app = FastAPI()


@task(name="Validate Token")
def validate_token_task(token: str) -> bool:
    logger.info("Validating token...")
    try:
        token_request = TokenRequest(token=token)
        response = requests.post(TOKEN_VALIDATOR_URL, json=token_request.model_dump())
        response.raise_for_status()
        return True
    except requests.HTTPError as e:
        if e.response.status_code == 401:
            logger.error(f"Invalid token received: {e.response.status_code} - {e.response.text}")
            raise ValueError("Invalid token received")
        logger.error(f"Request to token validator failed: {e.response.status_code} - {e.response.text}")
    except requests.RequestException as e:
        logger.error(f"Request to token validator failed {e}")
    except Exception as e:
        logger.error(f"Token validation failed: {e}")
    return False

@task(name="Validate Code and Generate Prompt")
def generate_prompt_code_validator_task(code: str, file_extension: str) -> str:
    logger.info("Sending code to code validator")
    try:
        request_data = SyntaxCheckRequest(file_extension=file_extension, code=code)
        response = requests.post(CODE_VALIDATOR_URL, json=request_data.model_dump())
        response.raise_for_status()
        validation_result = response.json()
        logger.info(f"Code validation result: {validation_result}")
        return validation_result
    except requests.HTTPError as e:
        if e.response.status_code == 400:
            logger.error(f"Invalid code received: {e.response.status_code} - {e.response.text}")
            raise ValueError("Invalid code received")
        elif e.response.status_code == 422:
            logger.error(f"Invalid file extension received: {e.response.status_code} - {e.response.text}")
            raise ValueError("Invalid file extension received")
        elif e.response.status_code == 500:
            logger.error(f"Error validating code: {e.response.status_code} - {e.response.text}")
            raise ValueError("Error validating code")
        logger.error(f"Request to code validator failed: {e.response.status_code} - {e.response.text}")
        raise ValueError(f"Error validating code")
    except requests.RequestException as e:
        logger.error(f"Request to code validator failed {e}")
        raise ValueError("Code validation failed due to a network or server error")
    except Exception as e:
        logger.error(f"Code validation failed: {e}")
        raise ValueError("Code validation failed")

@task(name="Call LLM Model")
def call_llm_task(prompt: str) -> str:
    logger.info("Calling LLM model to analyze code")

    logger.info("LLM output received")
    return "LLM output"

@task(name="Generate Report")
def generate_report_task(llm_output: str) -> str:
    logger.info("Sending LLM output to generate report summary")

    logger.info("Report summary generated")
    return "Report summary generated"

@task(name="Store Report")
def store_report_task(llm_output: str) -> str:
    logger.info("Sending report to web-app for storage")

    logger.info("Report stored successfully")
    return "Report stored succesfully"


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
            elif str(e) == "Error validating token": # If token validation fails for any other reason
                logger.error("Raised 500 due to error validating token")
                raise HTTPException(status_code=500, detail="Error validating token")
            elif str(e) == "Invalid code received": # If the code received is invalid
                logger.error("Raised 400 due to invalid code")
                raise HTTPException(status_code=400, detail="Invalid code received")
            elif str(e) == "Error validating code": # If the code validation fails for any other reason
                logger.error("Raised 500 due to error validating code")
                raise HTTPException(status_code=500, detail="Error validating code")
            elif str(e) == "Invalid file extension received": # If an invalid file extension is received
                logger.error("Raised 422 due to invalid file extension")
                raise HTTPException(status_code=422, detail="Invalid file extension received")
            else:
                logger.error("Raised 500 due to unknown error")
                raise HTTPException(status_code=500, detail="Server error occurred")

set_up_logger()

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=30000, reload=True)