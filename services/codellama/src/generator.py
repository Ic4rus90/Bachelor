from datetime import datetime
from fastapi import HTTPException
from transformers import AutoTokenizer, AutoModelForCausalLM
from config import model_id, cache_dir_model, cache_dir_tokenizer, system_prompt_preset, max_new_tokens, max_time, repetition_penalty, typical_p, do_sample
from encoder import decode_base, encode_base
from logger import logger
from models import GenerateRequest, GenerateResponse
from response_cleaner import clean_response

import torch

# Load tokenizer and model
logger.info("Loading tokenizer...")
tokenizer = AutoTokenizer.from_pretrained(model_id, cache_dir=cache_dir_tokenizer)
if hasattr(tokenizer, 'eos_token'):
    original_eos = tokenizer.eos_token
    tokenizer.eos_token = '<step>'
    logger.info(f"Changed eos_token from {original_eos} to {tokenizer.eos_token}")
else:
    logger.error("This tokenizer does not have an eos_token attribute.")
logger.info("Tokenizer loaded")

logger.info("Loading model...")
model = AutoModelForCausalLM.from_pretrained(model_id, torch_dtype=torch.float16, device_map="auto", cache_dir=cache_dir_model)
logger.info("Model loaded")


# Generate the LLM response from the input prompts
async def generate_text(request, generate_request: GenerateRequest) -> GenerateResponse:
    # Get client host for logging
    client_host = request.client.host
    logger.info(f"Received generation request from {client_host}.")

    user_prompt = decode_base(generate_request.user_prompt, client_host)

    if generate_request.system_prompt == "":
        system_prompt = system_prompt_preset
    else:
        system_prompt = decode_base(generate_request.system_prompt, client_host)

    # Generation
    try:
        chat = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt},
        ]

        # Get lenth of input in tokens
        input_tokens = len(tokenizer.encode(system_prompt + user_prompt, add_special_tokens=True))
        logger.info(f"Number of tokens in the input (from: {client_host}): {input_tokens}")
        
        # Apply chat template
        inputs = tokenizer.apply_chat_template(chat, return_tensors="pt").to("cuda")

        # Generate the response
        start_time = datetime.now()
        output = model.generate(
            input_ids=inputs,
            max_new_tokens=max_new_tokens,
            max_time=max_time,
            repetition_penalty=repetition_penalty,
            typical_p=typical_p,
            do_sample=do_sample
        )
        end_time = datetime.now()
        duration = (end_time - start_time).total_seconds()

        # Log useful information
        output = output[0].to("cpu")
        output_tokens = output.size(0)
        logger.info(f"Number of tokens in the output (from {client_host}): {output_tokens}")
        logger.info(f"Generation took {duration} seconds (from {client_host})")
        # Encode to base64 before response
        llm_response = tokenizer.decode(output)
        logger.info(f"LLM RESPONSE: {llm_response}")
        response = encode_base(clean_response(llm_response))
        logger.info(f"Generation request processed successfully. (from {client_host})")

        result = GenerateResponse(
            input_token_num=input_tokens,
            output_token_num=output_tokens,
            generation_time=duration,
            llm_output=response
        )
        return result
    except ValueError as e:
        if str(e) == "Could not find JSON in the output.":
            logger.error(f"Could not find JSON in the output (from {client_host}): {e}")
            raise HTTPException(status_code=400, detail="Could not find JSON in the output")
        elif str(e) == "Could not find LLM response in the output.":
            logger.error(f"Could not find LLM response in the output (from {client_host}): {e}")
            raise HTTPException(status_code=400, detail="Could not find LLM response in the output")
        else:
            logger.error(f"Error during text generation (from {client_host}): {e}")
            raise HTTPException(status_code=500, detail="Error during text generation")
    except Exception as e:
        logger.error(f"Error during text generation (from {client_host}): {e}")
        raise HTTPException(status_code=500, detail="Error during text generation")