from transformers import AutoTokenizer, AutoModelForCausalLM
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel #, Field
from loguru import logger
from datetime import datetime
#from typing import List, Optional

import torch
import base64


app = FastAPI()

model_id = "codellama/CodeLlama-70b-Instruct-hf"

log_file_path = "/usr/src/app/logs/codellama.log"
logger.add(log_file_path, rotation="50 MB", enqueue=True)


logger.info("Loading tokenizer and model...")
tokenizer = AutoTokenizer.from_pretrained(
   model_id,
   cache_dir="/usr/src/app/tokenizer"
)

model = AutoModelForCausalLM.from_pretrained(
   model_id,
   torch_dtype=torch.float16,
   device_map="auto",
   cache_dir="/usr/src/app/model"
)
logger.info("Tokenizer and model loaded successfully.")


class GenerateRequest(BaseModel):
    system_prompt: str = "WW91IGFyZSBhbiBleHBlcnQgcHJvZ3JhbW1lciB0aGF0IGdpdmVzIHNob3J0IGFuZCBjb25jaXNlIGFuc3dlcnMgdG8gdGhlIGdpdmVuIHF1ZXN0aW9ucw=="
    user_prompt: str = "QW5hbHl6ZSB0aGUgZm9sbG93aW5nIGNvZGUgYW5kIGdpdmUgYSBsaXN0IG9mIHZ1bG5lcmFiaWxpdGllcyBkaXNjb3ZlcmVkOgoKY2hhciAqIGNvcHlfaW5wdXQoY2hhciAqdXNlcl9zdXBwbGllZF9zdHJpbmcpewppbnQgaSwgZHN0X2luZGV4OwpjaGFyICpkc3RfYnVmID0gKGNoYXIqKW1hbGxvYyg0KnNpemVvZihjaGFyKSAqIE1BWF9TSVpFKTsKaWYgKCBNQVhfU0laRSA8PSBzdHJsZW4odXNlcl9zdXBwbGllZF9zdHJpbmcpICl7CmRpZSgidXNlciBzdHJpbmcgdG9vIGxvbmcsIGRpZSBldmlsIGhhY2tlciEiKTsKfQpkc3RfaW5kZXggPSAwOwpmb3IgKCBpID0gMDsgaSA8IHN0cmxlbih1c2VyX3N1cHBsaWVkX3N0cmluZyk7IGkrKyApewppZiggJyYnID09IHVzZXJfc3VwcGxpZWRfc3RyaW5nW2ldICl7CmRzdF9idWZbZHN0X2luZGV4KytdID0gJyYnOwpkc3RfYnVmW2RzdF9pbmRleCsrXSA9ICdhJzsKZHN0X2J1Zltkc3RfaW5kZXgrK10gPSAnbSc7CmRzdF9idWZbZHN0X2luZGV4KytdID0gJ3AnOwpkc3RfYnVmW2RzdF9pbmRleCsrXSA9ICc7JzsKfQplbHNlIGlmICgnPCcgPT0gdXNlcl9zdXBwbGllZF9zdHJpbmdbaV0gKXsKCi8qIGVuY29kZSB0byAmbHQ7ICovCn0KZWxzZSBkc3RfYnVmW2RzdF9pbmRleCsrXSA9IHVzZXJfc3VwcGxpZWRfc3RyaW5nW2ldOwp9CnJldHVybiBkc3RfYnVmOwp9"
    max_new_tokens: int = 4096
    temperature: float = 1.0
    top_p: float = 1.0
    top_k: int = 50
    num_return_sequences: int = 1
    early_stopping: bool = False
    max_time: int = 120
    #force_words_ids: Optional[List[int]] = Field(default_factory=list)
    #constraints: Optional[List[str]] = Field(default_factory=list)


# Function that decodes the code in the API request (which is base64 encoded) for validation
def decode_base(encoded_text):
    try:
        decoded_code = base64.b64decode(encoded_text.encode('utf-8')).decode('utf-8')
        return decoded_code
    except Exception as e:
        logger.error(f"Error decoding base64: {e}")
        raise HTTPException(status_code=400, detail="Invalid base64 in request")

# Function that encodes the code back to base64 after validation
def encode_base(decoded_text):
    encoded_code = base64.b64encode(decoded_text.encode('utf-8')).decode('utf-8')
    return encoded_code


@app.post("/generate/")
async def generate(request: GenerateRequest):
    logger.info("Received generation request.")
    try:
        system_prompt = decode_base(request.system_prompt)
        user_prompt = decode_base(request.user_prompt)

        chat = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt},
        ]

        input_tokens = len(tokenizer.encode(system_prompt + user_prompt, add_special_tokens=True))
        logger.info(f"Number of tokens in the input: {input_tokens}")

        inputs = tokenizer.apply_chat_template(chat, return_tensors="pt").to("cuda")

        start_time = datetime.now()
        output = model.generate(
            input_ids=inputs,
            max_new_tokens=request.max_new_tokens,
            temperature=request.temperature,
            top_p=request.top_p,
            top_k=request.top_k,
            num_return_sequences=request.num_return_sequences,
            early_stopping=request.early_stopping,
            max_time=request.max_time
            #force_words_ids=request.force_words_ids,
            #constraints=request.constraints
        )
        end_time = datetime.now()
        # Calculate the duration
        duration = (end_time - start_time).total_seconds()

        output = output[0].to("cpu")
        output_tokens = output.size(0)
        logger.info(f"Number of tokens in the output: {output_tokens}")
        logger.info(f"Generation took {duration} seconds")

        response = encode_base(tokenizer.decode(output))
        logger.info("Generation request processed successfully.")

        result = [
            {"input_token_num": input_tokens},
            {"output_token_num": output_tokens},
            {"generation_time": duration},
            {"response": response}
        ]
        return result
    except Exception as e:
        logger.error(f"Error during text generation: {e}")
        raise HTTPException(status_code=500, detail="Error during text generation")
    