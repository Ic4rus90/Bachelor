import base64
from logger import logger


# Function that decodes the code in the API request (which is base64 encoded) for validation
def decode_base(encoded_text):
    try:
        decoded_code = base64.b64decode(encoded_text.encode('utf-8')).decode('utf-8')
        return decoded_code
    except Exception as e:
        logger.error(f"Error decoding base64: {e}")
        raise ValueError("Error decoding base64")

# Function that encodes the code back to base64 after validation
def encode_base(decoded_text):
    try:
        encoded_code = base64.b64encode(decoded_text.encode('utf-8')).decode('utf-8')
        return encoded_code
    except Exception as e:
        logger.error(f"Error during encoding to base64: {e}")
        raise ValueError("Error encoding to base64")