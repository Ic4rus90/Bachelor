TOKEN_VALIDATOR_URL = "http://bsc-group-17-tokenval.bsc-group-17:30001/verify-token"
CODE_VALIDATOR_URL = "http://bsc-group-17-code-val.bsc-group-17:30002/check-syntax"
LLM_URL = "http://bsc-group-17-llm.bsc-group-17:30003/generate"
REPORT_GENERATOR_URL = "http://bsc-group-17-report-generator.bsc-group-17:30004/generate-report"
REPORT_STORAGE_URL = "http://bsc-group-17-web-server.bsc-group-17:3001/addreports"


LLM_SCHEMA = {
  "type": "object",
  "required": ["vulnerabilities"],
  "properties": {
    "vulnerabilities": {
      "type": "array",
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
