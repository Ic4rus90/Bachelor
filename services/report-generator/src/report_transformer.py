from json_validator import validate_data
from config import INPUT_SCHEMA, REPORT_SUMMARY_SCHEMA, REPORT_FULL_SCHEMA
from models import TransformRequest, TransformResponse
from encoder import decode_base, encode_base
from logger import logger

import json


# Function to transform data to fit REPORT_SUMMARY_SCHEMA
def transform_to_summary(input_data):
    try:
        summary_data = {"vulnerabilities": []}
        for vuln in input_data["vulnerabilities"]:
            summary_vuln = {key: vuln[key] for key in vuln if key != "lineNumber"}
            summary_data["vulnerabilities"].append(summary_vuln)    
        return summary_data
    except Exception as e:
        logger.error(f"Error transforming data to summary report: {e}")
        raise ValueError("Error transforming data to summary report")

# Function to transform data to fit REPORT_FULL_SCHEMA
def transform_to_full(input_data, user_id, analyzed_code):
    try:
        full_data = {
            "userID": user_id,
            "vulnerabilities": input_data["vulnerabilities"], 
            "analyzedCode": analyzed_code
        }    
        return full_data
    except Exception as e:
        logger.error(f"Error transforming data to full report: {e}")
        raise ValueError("Error transforming data to full report")

def generate_reports(request: TransformRequest) -> TransformResponse:
    logger.info("Decoding input base64...")
    llm_output = request.llm_output
    user_id = request.user_id
    file_extension = request.file_extension
    analyzed_code = request.analyzed_code
    starting_line_number = request.starting_line_number

    decoded_data = (decode_base(llm_output))

    try:
        decoded_data = json.loads(decoded_data)
    except Exception as e:
        logger.error(f"Error decoding JSON: {e}")
        raise ValueError("Error decoding JSON")
    
    # Validate input data against INPUT_SCHEMA
    logger.info("Validating input data")
    validate_data(decoded_data, INPUT_SCHEMA)
    
    # Transform to summary and full report data
    logger.info("Creating summary report...")
    summary_data = transform_to_summary(decoded_data)
    logger.info("Creating full report...")
    full_data = transform_to_full(decoded_data, user_id, {
        "code": decode_base(analyzed_code),
        "language": file_extension,
        "startingLineNumber": starting_line_number
    })
    
    # Validate transformed data
    logger.info("Validating summary report...")
    validate_data(summary_data, REPORT_SUMMARY_SCHEMA)
    logger.info("Validating full report...")
    validate_data(full_data, REPORT_FULL_SCHEMA)
    
    # Encode the transformed data as base64 JSON strings
    logger.info("Encoding summary into base64...")
    encoded_summary = encode_base(json.dumps(summary_data))
    logger.info("Encoding full report into base64...")
    encoded_full = encode_base(json.dumps(full_data))
    
    return TransformResponse(encoded_summary=encoded_summary, encoded_full=encoded_full)