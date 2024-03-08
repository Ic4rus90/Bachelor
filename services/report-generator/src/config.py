# The input schema (for reference)
INPUT_SCHEMA = {
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

# The summary report schema
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

# The full report schema
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
