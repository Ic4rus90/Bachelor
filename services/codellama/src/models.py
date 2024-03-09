from pydantic import BaseModel

class GenerateRequest(BaseModel):
    system_prompt: str
    user_prompt: str
    #max_time: int = 120
    #repetition_penalty: float = 1.15
    #typical_p: float = 1

class GenerateResponse(BaseModel):
    input_token_num: int
    output_token_num: int
    generation_time: float
    llm_output: str