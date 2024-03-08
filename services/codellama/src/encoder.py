import base64
from fastapi import HTTPException
from logger import logger


# Function that decodes the code in the API request (which is base64 encoded) for validation
def decode_base(encoded_text, source):
    try:
        decoded_code = base64.urlsafe_b64decode(encoded_text.encode('utf-8')).decode('utf-8')
        return decoded_code
    except Exception as e:
        logger.error(f"Error decoding base64 from {source}: {e}")
        raise HTTPException(status_code=400, detail="Invalid base64 in request")

# Function that encodes the code back to base64 after validation
def encode_base(decoded_text):
    try:
        encoded_code = base64.urlsafe_b64encode(decoded_text.encode('utf-8')).decode('utf-8')
        return encoded_code
    except Exception as e:
        logger.error(f"Error during encoding to base64: {e}")
        raise HTTPException(status_code=400, detail="Error during base64 encoding")
