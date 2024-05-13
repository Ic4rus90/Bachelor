from jsonschema import validate
from jsonschema.exceptions import ValidationError
from logger import logger
from config import LLM_SCHEMA, REPORT_SUMMARY_SCHEMA, REPORT_FULL_SCHEMA
from encoder import decode_base

import json


# Function that verifies JSON objects against the required JSON schemas.
def verify_llm_output_format(llm_output: str, source: str) -> bool:
    logger.info(f"Verifying LLM output format with source: {source}...")
    
    try:
        decoded_data = decode_base(llm_output)
        # Attempt to parse the LLM output as JSON
        llm_data = json.loads(decoded_data)
        
        # Validate the parsed JSON data against the schema
        if source == "llm":
            validate(instance=llm_data, schema=LLM_SCHEMA)
        elif source == "report_summary":
            validate(instance=llm_data, schema=REPORT_SUMMARY_SCHEMA)
        elif source == "report_full":
            validate(instance=llm_data, schema=REPORT_FULL_SCHEMA)
        else:
            raise ValueError(f"Invalid source: {source}")
        
        logger.info("LLM output format is valid.")
        return True  # Return True if the output matches the schema
    except json.JSONDecodeError as e:
        logger.error(f"Invalid JSON format: {e}")
    except ValidationError as e:
        logger.error(f"Schema validation error: {e}")
    except Exception as e:
        logger.error(f"Other error occured: {e}")
    
    return False  # Return False if there were any exceptions
  