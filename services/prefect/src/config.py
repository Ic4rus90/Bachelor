TOKEN_VALIDATOR_URL = "http://localhost:30001/verify-token"
CODE_VALIDATOR_URL = "http://localhost:30002/check-syntax"
LLM_URL = "http://localhost:30003/generate"
REPORT_GENERATOR_URL = "http://localhost:30004/generate-report"
REPORT_STORAGE_URL = "http://localhost:30005/store-report"

LLM_SCHEMA = {
    "type": "object",
    "properties": {
        "vulnerability": {"type": "string"},
        "excerpt": {"type": "string"},
        "line_number": {"type": "number"},
        "description": {"type": "string"},
    },
    "required": ["vulnerability", "excerpt", "line_number", "description"],
    "additionalProperties": False
}