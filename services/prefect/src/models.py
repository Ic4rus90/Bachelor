from pydantic import BaseModel

class TokenRequest(BaseModel):
    token: str

class TokenResponse(BaseModel):
    message: str

class CodeAnalysisRequest(BaseModel):
    code: str
    file_extension: str
    line_number: int
    #token: str
    class Config:
        extra = "forbid"

class SyntaxCheckRequest(BaseModel):
    file_extension: str
    code: str

class SyntaxCheckResponse(BaseModel):
    user_prompt: str

class LLMRequest(BaseModel):
    user_prompt: str
    system_prompt: str = ""

class LLMResponse(BaseModel):
    input_token_num: int
    output_token_num: int
    generation_time: float
    llm_output: str

class GenerateReportRequest(BaseModel):
    llm_output: str
    user_id: str
    file_extension: str
    analyzed_code: str
    starting_line_number: int

class GenerateReportResponse(BaseModel):
    encoded_summary: str
    encoded_full: str

class StoreReportRequest(BaseModel):
    report_full: str
