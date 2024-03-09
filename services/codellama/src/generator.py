from datetime import datetime
from fastapi import HTTPException
from transformers import AutoTokenizer, LlamaForCausalLM
from config import model_id, cache_dir_model, cache_dir_tokenizer, system_prompt_preset, system_prompt_marker, user_prompt_marker, assistant_prompt_marker, max_new_tokens, repetition_penalty, do_sample, top_p, top_k, temperature
from encoder import decode_base, encode_base
from logger import logger
from models import GenerateRequest, GenerateResponse
from response_cleaner import clean_response

import torch

# Load tokenizer and model
logger.info("Loading tokenizer...")
tokenizer = AutoTokenizer.from_pretrained(model_id, cache_dir=cache_dir_tokenizer)
#if hasattr(tokenizer, 'eos_token'):
#    original_eos = tokenizer.eos_token
#    tokenizer.eos_token = '<step>'
#    logger.info(f"Changed eos_token from {original_eos} to {tokenizer.eos_token}")
#else:
#    logger.error("This tokenizer does not have an eos_token attribute.")
tokenizer.pad_token = tokenizer.eos_token
logger.info("Tokenizer loaded")

logger.info("Loading model...")
model = LlamaForCausalLM.from_pretrained(model_id, torch_dtype=torch.float16, device_map="auto", cache_dir=cache_dir_model)
logger.info("Model loaded")


# Generate the LLM response from the input prompts
async def generate_text(request, generate_request: GenerateRequest) -> GenerateResponse:
    # Get client host for logging
    client_host = request.client.host
    logger.info(f"Received generation request from {client_host}.")

    user_prompt = user_prompt_marker + decode_base(generate_request.user_prompt, client_host) + "\n"

    if generate_request.system_prompt == "":
        system_prompt = system_prompt_marker + system_prompt_preset
    else:
        system_prompt = system_prompt_marker + decode_base(generate_request.system_prompt, client_host)

    combined_prompt = system_prompt + user_prompt + assistant_prompt_marker
    try:
        inputs = tokenizer(combined_prompt, return_tensors="pt", truncation=True, max_length=4096)

        # Get lenth of input in tokens
        input_tokens = len(tokenizer.encode(combined_prompt, add_special_tokens=True))
        logger.info(f"Number of tokens in the input (from: {client_host}): {input_tokens}")
        
        # Generate
        start_time = datetime.now()
        generate_ids = model.generate(inputs.input_ids.to("cuda"), max_new_tokens=max_new_tokens, repetition_penalty=repetition_penalty, do_sample=do_sample, top_p=top_p, top_k=top_k, temperature=temperature)
        completion = tokenizer.batch_decode(generate_ids, skip_special_tokens=True, clean_up_tokenization_spaces=False)[0]
        #completion = completion.replace(system_prompt, "").split("\n\n\n")[0]
        #completion = completion.replace(user_prompt, "").split("\n\n\n")[0]
        end_time = datetime.now()
        
        duration = (end_time - start_time).total_seconds()

        # Log useful information
        completion_tokens = len(tokenizer.encode(completion, add_special_tokens=True))
        logger.info(f"Number of tokens in the output (from {client_host}): {completion_tokens}")
        logger.info(f"Generation took {duration} seconds (from {client_host})")
        # Encode to base64 before response
        llm_response = completion
        logger.info(f"LLM RESPONSE: {llm_response}")
        response = encode_base(clean_response(llm_response))
        logger.info(f"Generation request processed successfully. (from {client_host})")

        result = GenerateResponse(
            input_token_num=input_tokens,
            output_token_num=completion_tokens,
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
    