from fastapi import FastAPI, HTTPException

from pydantic import BaseModel

from validators.py_val import is_valid_python_code
from validators.c_val import check_c_syntax
from validators.cpp_val import check_cpp_syntax
from validators.cs_val import check_csharp_syntax

from loguru import logger

import os
import base64


app = FastAPI()

# Define the model for the request body
class SyntaxCheckRequest(BaseModel):
    file_extension: str
    code: str

# Sets up loguru to log to a file under code-validator/logs
def set_up_logger():
    cur_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.dirname(cur_dir)
    logs_dir = os.path.join(parent_dir, "logs")
    os.makedirs(logs_dir, exist_ok=True)
    log_file_path = os.path.join(logs_dir, "syntax_checks.log")
    logger.add(log_file_path, rotation="50 MB", enqueue=True)

# Function that decodes the code in the API request (which is base64 encoded) for validation
def decode_code(encoded_code):
    try:
        decoded_code = base64.b64decode(encoded_code.encode('utf-8')).decode('utf-8')
        return decoded_code
    except Exception as e:
        logger.error(f"Error decoding code: {e}")
        raise HTTPException(status_code=500, detail="Invalid base64 in request")

# Function that encodes the code back to base64 after validation
def encode_code(decoded_code):
    encoded_code = base64.b64encode(decoded_code.encode('utf-8')).decode('utf-8')
    return encoded_code

# Function that generates response that is sent from this code-validator service to the API gateway
def generate_prompt(user_prompt, code):
        # Print for debugging and placeholder before we have a frontend
        print(f"User prompt: {user_prompt}\nCode: {code}")
        return {"user_prompt": user_prompt, "code": encode_code(code)}

set_up_logger()

# Route for checking the syntax of the code
@app.post("/check-syntax/")
async def check_syntax(request: SyntaxCheckRequest):
    file_extension = request.file_extension
    code = decode_code(request.code)
    user_prompt = ""

    # Check the file extension and validate the code accordingly
    if file_extension == "py":
        user_prompt = "Analyze this Python code"
        try:
           is_valid_python_code(code)
           # Returns the generated prompt to the API gateway
           return generate_prompt(user_prompt, code)
        # If there is a syntax error, log the error and raise an HTTPException
        except SyntaxError as e:
            logger.error(f"Python syntax error: {e}")
            raise HTTPException(status_code=400, detail="Invalid Python code")

    elif file_extension == "c":
        user_prompt = "Analyze this C code"
        try:
            check_c_syntax(code)
            return generate_prompt(user_prompt, code)
        except SyntaxError as e:
            logger.error(f"C syntax error: {e}")
            raise HTTPException(status_code=400, detail="Invalid C code")
        
    elif file_extension == "cpp":
        user_prompt = "Analyze this C++ code"
        try:
            check_cpp_syntax(code)
            return generate_prompt(user_prompt, code)
        except SyntaxError as e:
            logger.error(f"C++ syntax error: {e}")
            raise HTTPException(status_code=400, detail="Invalid C++ code")
        
    elif file_extension == "cs":
        user_prompt = "Analyze this C# code"
        try:
            check_csharp_syntax(code)
            return generate_prompt(user_prompt, code)
        except SyntaxError as e:
            logger.error(f"C# syntax error: {e}")
            raise HTTPException(status_code=400, detail="Invalid C# code")
    else:
        logger.warning("Invalid file extension")
        raise HTTPException(status_code=400, detail="Invalid file extension")

# TODO: send the prompt to Kong gateway

