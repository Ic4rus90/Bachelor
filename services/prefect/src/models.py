from pydantic import BaseModel

class TokenRequest(BaseModel):
    token: str

class CodeAnalysisRequest(BaseModel):
    code: str
    file_extension: str
    token: str

class SyntaxCheckRequest(BaseModel):
    file_extension: str
    code: str

class SyntaxCheckResponse(BaseModel):
    user_prompt: str

class LLMRequest(BaseModel):
    user_prompt: str

class LLMResponse(BaseModel):
    input_token_num: int
    output_token_num: int
    generation_time: float
    llm_output: str