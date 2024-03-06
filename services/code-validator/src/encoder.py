import base64

from fastapi import HTTPException
from logger import logger

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
