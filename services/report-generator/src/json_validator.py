from jsonschema import validate
from jsonschema.exceptions import ValidationError
from logger import logger


# Validate data against a JSON schema
def validate_data(data, schema):
    try:
        validate(instance=data, schema=schema)
        logger.info("Validation of JSON schema successful")
    except ValidationError as e:
        logger.error(f"Validation of JSON schema failed {e}")
        raise ValueError(f"Validation of JSON schema failed")
    except Exception as e:
        logger.error(f"Error during validation of JSON schema {e}")
        raise ValueError(f"Error during validation of JSON schema")
