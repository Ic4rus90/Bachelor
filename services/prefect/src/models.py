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
    system_prompt: str
    user_prompt: str
    max_new_tokens: int
    temperature: float
    top_p: float
    top_k: int
    num_return_sequences: int
    early_stopping: bool
    max_time: int