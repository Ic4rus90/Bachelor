TOKEN_VALIDATOR_URL = "http://localhost:30001/verify-token"
CODE_VALIDATOR_URL = "http://localhost:30002/check-syntax"
LLM_URL = "http://localhost:30003/generate"
REPORT_GENERATOR_URL = "http://localhost:30004/generate-report"
REPORT_STORAGE_URL = "http://localhost:3000/addreports"

LLM_SCHEMA = {
  "type": "object",
  "required": ["vulnerabilities"],
  "properties": {
    "vulnerabilities": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "required": ["cweID", "codeExtract", "vulnSummary"],
        "properties": {
          "cweID": {
            "type": "string",
            "pattern": "^CWE-\\d+$"
          },
          "codeExtract": {
            "type": "string"
          },
          "lineNumber": {
            "type": "integer"
          },
          "vulnSummary": {
            "type": "string"
          }
        }
      }
    }
  }
}

REPORT_SUMMARY_SCHEMA = {
  "type": "object",
  "required": ["vulnerabilities"],
  "properties": {
    "vulnerabilities": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "required": ["cweID", "codeExtract", "vulnSummary"],
        "properties": {
          "cweID": {
            "type": "string",
            "pattern": "^CWE-\\d+$"
          },
          "codeExtract": {
            "type": "string"
          },
          "vulnSummary": {
            "type": "string"
          }
        }
      }
    }
  }
}

REPORT_FULL_SCHEMA = {
  "type": "object",
  "required": ["vulnerabilities", "analyzedCode"],
  "properties": {
    "userID": {
      "type": "string"
    },
    "vulnerabilities": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "required": ["cweID", "codeExtract", "vulnSummary"],
        "properties": {
          "cweID": {
            "type": "string",
            "pattern": "^CWE-\\d+$"
          },
          "codeExtract": {
            "type": "string"
          },
          "vulnSummary": {
            "type": "string"
          }
        }
      }
    },
    "analyzedCode": {
      "type": "object",
      "required": ["code", "language", "startingLineNumber"],
      "properties": {
        "code": {
          "type": "string"
        },
        "language": {
          "type": "string"
        },
        "startingLineNumber": {
          "type": "integer"
        }
      }
    }
  }
}
