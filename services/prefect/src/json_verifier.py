from jsonschema import validate
from jsonschema.exceptions import ValidationError
from logger import logger
from config import LLM_SCHEMA
from encoder import decode_base

import json

def verify_llm_output_format(llm_output: str) -> bool:
    logger.info("Verifying LLM output format")
    
    try:
        decoded_data = decode_base(llm_output)
        # Attempt to parse the LLM output as JSON
        llm_data = json.loads(decoded_data)
        
        # Validate the parsed JSON data against the schema
        validate(instance=llm_data, schema=LLM_SCHEMA)
        
        logger.info("LLM output format is valid.")
        return True  # Return True if the output matches the schema
    except json.JSONDecodeError as e:
        logger.error(f"Invalid JSON format: {e}")
    except ValidationError as e:
        logger.error(f"Schema validation error: {e}")
    except Exception as e:
        logger.error(f"Other error occured: {e}")
    
    return False  # Return False if there were any exceptions