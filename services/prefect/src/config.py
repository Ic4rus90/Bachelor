TOKEN_VALIDATOR_URL = "http://bsc-group-17-tokenval.bsc-group-17:30001/verify-token"
CODE_VALIDATOR_URL = "http://bsc-group-17-code-val.bsc-group-17:30002/check-syntax"
LLM_URL = "http://bsc-group-17-llm-load-balancer.bsc-group-17:30003/generate"
REPORT_GENERATOR_URL = "http://bsc-group-17-report-generator.bsc-group-17:30004/generate-report"
REPORT_STORAGE_URL = "https://bsc-group-17-web-server.bsc-group-17:3001/addreports"

HTTPS_CERT_PATH ="cair-gpu12.uia.no.crt"
RATE_LIMIT="1/40 seconds"
ALLOWED_CODE_LENGTH=50000


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
            "enum": ["CWE-787", "CWE-79", "CWE-89", "CWE-416", "CWE-78", "CWE-20", "CWE-125", "CWE-22", "CWE-352", "CWE-434", "CWE-862", "CWE-476", "CWE-287", "CWE-190", "CWE-502", "CWE-77", "CWE-119", "CWE-798", "CWE-918", "CWE-306", "CWE-362", "CWE-269", "CWE-94", "CWE-863", "CWE-276"]
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
