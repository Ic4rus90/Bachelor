from logger import logger
from prefect import task
from models import TokenRequest, SyntaxCheckRequest, SyntaxCheckResponse, LLMRequest, LLMResponse
from config import TOKEN_VALIDATOR_URL, CODE_VALIDATOR_URL, LLM_URL, REPORT_GENERATOR_URL, REPORT_STORAGE_URL

import requests


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
        user_prompt = SyntaxCheckResponse(**response.json()).user_prompt
        logger.info(f"Received prompt from code-validator: {user_prompt}")
        return user_prompt
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
    try:
        request_data = LLMRequest(user_prompt=prompt)
        response = requests.post(LLM_URL, json=request_data.model_dump())
        response.raise_for_status()
        print(response.json())
        llm_output = LLMResponse(**response.json()).llm_output
        input_token_num = LLMResponse(**response.json()).input_token_num
        output_token_num = LLMResponse(**response.json()).output_token_num
        generation_time = LLMResponse(**response.json()).generation_time
        logger.info(f"LLM output received: \nInput tokens: {input_token_num}, output tokens: {output_token_num}, generation time: {generation_time}\nLLM output: {llm_output}")
        return llm_output
    except requests.HTTPError as e:
        if e.response.status_code == 500:
            logger.error(f"Internal server error occured in LLM: {e.response.status_code} - {e.response.text}")
            raise ValueError("LLM server error occured")
        logger.error(f"Error calling LLM model: {e.response.status_code} - {e.response.text}")
        raise ValueError("Error calling LLM model")
    except requests.RequestException as e:
        logger.error(f"Request to LLM model failed {e}")
        raise ValueError("LLM model call failed due to a network or server error")
    except Exception as e:
        logger.error(f"LLM model call failed: {e}")
        raise ValueError("LLM model call failed")

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