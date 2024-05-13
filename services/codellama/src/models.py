from pydantic import BaseModel

# Model for requests to this service
class GenerateRequest(BaseModel):
    system_prompt: str
    user_prompt: str

# Model for outgoing responses
class GenerateResponse(BaseModel):
    input_token_num: int
    output_token_num: int
    generation_time: float
    llm_output: str