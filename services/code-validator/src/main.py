from loguru import logger

import os
import base64

def set_up_logger():
    cur_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.dirname(cur_dir)
    logs_dir = os.path.join(parent_dir, "logs")
    os.makedirs(logs_dir, exist_ok=True)
    log_file_path = os.path.join(logs_dir, "syntax_checks.log")
    logger.add(log_file_path, rotation="50 MB", enqueue=True)

def decode_code(encoded_code):
    try:
        decoded_code = base64.b64decode(encoded_code.encode('utf-8')).decode('utf-8')
        return decoded_code
    except Exception as e:
        logger.error(f"Error decoding code: {e}")
        raise HTTPException(status_code=400, detail="Invalid request")

def encode_code(decoded_code):
    encoded_code = base64.b64encode(decoded_code.encode('utf-8')).decode('utf-8')
    return encoded_code
set_up_logger()
