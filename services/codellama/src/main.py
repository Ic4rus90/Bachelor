from transformers import AutoTokenizer, AutoModelForCausalLM
from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel #, Field
from loguru import logger
from datetime import datetime
#from typing import List, Optional

import torch
import base64


app = FastAPI()

#model_id = "codellama/CodeLlama-34b-Instruct-hf"
model_id = "codellama/CodeLlama-70b-Instruct-hf"

def set_up_logger():
    cur_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.dirname(cur_dir)
    logs_dir = os.path.join(parent_dir, "logs")
    os.makedirs(logs_dir, exist_ok=True)
    log_file_path = os.path.join(logs_dir, "codellama-70b.log")
    logger.add(log_file_path, rotation="50 MB", enqueue=True)

set_up_logger()


logger.info("Loading tokenizer...")
tokenizer = AutoTokenizer.from_pretrained(
   model_id,
   cache_dir="/usr/src/app/tokenizer"
)
logger.info("Tokenizer loaded")

logger.info("Loading model...")
model = AutoModelForCausalLM.from_pretrained(
   model_id,
   torch_dtype=torch.float16,
   device_map="auto",
   cache_dir="/usr/src/app/model"
)
logger.info("Model loaded")


class GenerateRequest(BaseModel):
    system_prompt: str = "WW91IGFyZSBhbiBleHBlcnQgcHJvZ3JhbW1lciB0aGF0IGdpdmVzIHNob3J0IGFuZCBjb25jaXNlIGFuc3dlcnMgdG8gdGhlIGdpdmVuIHF1ZXN0aW9ucw=="
    user_prompt: str = "QW5hbHl6ZSB0aGUgZm9sbG93aW5nIGNvZGUgYW5kIGdpdmUgYSBsaXN0IG9mIHZ1bG5lcmFiaWxpdGllcyBkaXNjb3ZlcmVkOgoKY2hhciAqIGNvcHlfaW5wdXQoY2hhciAqdXNlcl9zdXBwbGllZF9zdHJpbmcpewppbnQgaSwgZHN0X2luZGV4OwpjaGFyICpkc3RfYnVmID0gKGNoYXIqKW1hbGxvYyg0KnNpemVvZihjaGFyKSAqIE1BWF9TSVpFKTsKaWYgKCBNQVhfU0laRSA8PSBzdHJsZW4odXNlcl9zdXBwbGllZF9zdHJpbmcpICl7CmRpZSgidXNlciBzdHJpbmcgdG9vIGxvbmcsIGRpZSBldmlsIGhhY2tlciEiKTsKfQpkc3RfaW5kZXggPSAwOwpmb3IgKCBpID0gMDsgaSA8IHN0cmxlbih1c2VyX3N1cHBsaWVkX3N0cmluZyk7IGkrKyApewppZiggJyYnID09IHVzZXJfc3VwcGxpZWRfc3RyaW5nW2ldICl7CmRzdF9idWZbZHN0X2luZGV4KytdID0gJyYnOwpkc3RfYnVmW2RzdF9pbmRleCsrXSA9ICdhJzsKZHN0X2J1Zltkc3RfaW5kZXgrK10gPSAnbSc7CmRzdF9idWZbZHN0X2luZGV4KytdID0gJ3AnOwpkc3RfYnVmW2RzdF9pbmRleCsrXSA9ICc7JzsKfQplbHNlIGlmICgnPCcgPT0gdXNlcl9zdXBwbGllZF9zdHJpbmdbaV0gKXsKCi8qIGVuY29kZSB0byAmbHQ7ICovCn0KZWxzZSBkc3RfYnVmW2RzdF9pbmRleCsrXSA9IHVzZXJfc3VwcGxpZWRfc3RyaW5nW2ldOwp9CnJldHVybiBkc3RfYnVmOwp9"
    max_new_tokens: int = 2048
    #temperature: float = 0.01
    #top_p: float = 0.9
    #top_k: int = 20
    max_time: int = 120
    repetition_penalty: float = 1.15
    typical_p: float = 1
    #force_words_ids: Optional[List[int]] = Field(default_factory=list)
    #constraints: Optional[List[str]] = Field(default_factory=list)


# Function that decodes the code in the API request (which is base64 encoded) for validation
def decode_base(encoded_text, source):
    try:
        decoded_code = base64.b64decode(encoded_text.encode('utf-8')).decode('utf-8')
        return decoded_code
    except Exception as e:
        logger.error(f"Error decoding base64 from {source}: {e}")
        raise HTTPException(status_code=400, detail="Invalid base64 in request")

# Function that encodes the code back to base64 after validation
def encode_base(decoded_text):
    encoded_code = base64.b64encode(decoded_text.encode('utf-8')).decode('utf-8')
    return encoded_code


@app.post("/generate/")
async def generate(request: Request, generate_request: GenerateRequest):
    client_host = request.client.host
    logger.info(f"Received generation request from {client_host}.")
    system_prompt = decode_base(generate_request.system_prompt, client_host)
    user_prompt = decode_base(generate_request.user_prompt, client_host)
    try:
        chat = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt},
        ]

        input_tokens = len(tokenizer.encode(system_prompt + user_prompt, add_special_tokens=True))
        logger.info(f"Number of tokens in the input (from: {client_host}): {input_tokens}")

        raw_input = tokenizer.apply_chat_template(chat, tokenize=False)
        logger.info(f"Raw token input: {raw_input}")
        inputs = tokenizer.apply_chat_template(chat, return_tensors="pt").to("cuda")
        logger.info(f"Token input: {inputs}")

        start_time = datetime.now()
        output = model.generate(
            input_ids=inputs,
            max_new_tokens=generate_request.max_new_tokens,
            #temperature=generate_request.temperature,
            #top_p=generate_request.top_p,
            #top_k=generate_request.top_k,
            max_time=generate_request.max_time,
            repetition_penalty=generate_request.repetition_penalty,
            typical_p=generate_request.typical_p,
            do_sample=False
            #force_words_ids=generate_request.force_words_ids,
            #constraints=generate_request.constraints
        )
        end_time = datetime.now()
        # Calculate the duration
        duration = (end_time - start_time).total_seconds()

        output = output[0].to("cpu")
        output_tokens = output.size(0)
        logger.info(f"Number of tokens in the output (from {client_host}): {output_tokens}")
        logger.info(f"Generation took {duration} seconds (from {client_host})")

        response = encode_base(tokenizer.decode(output))
        logger.info(f"Generation request processed successfully. (from {client_host})")

        result = [
            {"input_token_num": input_tokens},
            {"output_token_num": output_tokens},
            {"generation_time": duration},
            {"response": response}
        ]
        return result
    except Exception as e:
        logger.error(f"Error during text generation (from {client_host}): {e}")
        raise HTTPException(status_code=500, detail="Error during text generation")
    