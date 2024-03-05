model_id = "codellama/CodeLlama-70b-Instruct-hf"
cache_dir_model = "/usr/src/app/model"
cache_dir_tokenizer = "/usr/src/app/tokenizer"


max_new_tokens=2048
max_time=60
repetition_penalty=1.15
typical_p=1
do_sample=False
system_prompt = "Analyze the provided code segment for security vulnerabilities based on the CWE Top 25 and output the analysis in strict JSON format only. For each vulnerability found, include only the following fields in a JSON object: 'vulnerability' (with CWE-ID), 'excerpt' (specific part of the code), 'line_number (which line number the excerpt is from including newlines, starting from line number 1), and 'description' (why it is a vulnerability). Do not include any explanatory text outside of the JSON structure."
