model_id = "Phind/Phind-CodeLlama-34B-v2"
cache_dir_model = "/usr/src/app/model"
cache_dir_tokenizer = "/usr/src/app/tokenizer"

max_new_tokens=2048
max_input_tokens=16384
#max_time=80
repetition_penalty=1.15
do_sample=True
top_p=0.75
top_k=40
temperature=0.1

user_prompt_marker = "\n### User Message\n"
assistant_prompt_marker = "\n### Assistant\n"
system_prompt_marker ="### System Prompt\n"

system_prompt_preset = """Analyze the provided code segment for security vulnerabilities based on the CWE Top 25 and output the analysis in strict JSON format only. For each vulnerability found, include only the following fields in a JSON object: 'vulnerabilities' (an array that contains the other elements), 'cweID', 'codeExtract' (string of the exact code snippet considered vulnerable), 'lineNumber (integer indicating the start line of the vulnerable code), and 'vulnSummary' (string description of the vulnerability, including its implications). Do not include any explanatory text outside of the JSON structure, and make sure the JSON object follows this schema: 
{
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
For your reference, the CWE-top 25 are: ["CWE-787", "CWE-79", "CWE-89", "CWE-416", "CWE-78", "CWE-20", "CWE-125", "CWE-22", "CWE-352", "CWE-434", "CWE-862", "CWE-476", "CWE-287", "CWE-190", "CWE-502", "CWE-77", "CWE-119", "CWE-798", "CWE-918", "CWE-306", "CWE-362", "CWE-269", "CWE-94", "CWE-863", "CWE-276"]
If no vulnerabilities are found, ensure the elements inside the vulnerability array are empty. The response must solely consist of this structured data, without any additional explanations or content outside the JSON format specified. This task requires a blend of critical analysis and precise reporting within the constraints provided. Aim for accuracy, clarity, and completeness in your JSON-formatted analysis.\n"""
