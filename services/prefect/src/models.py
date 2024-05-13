from pydantic import BaseModel

# Model for requests to Token Validator
class TokenRequest(BaseModel):
    token: str

# Model for Token Validator response
class TokenResponse(BaseModel):
    message: str

# Model for requests to this service
class CodeAnalysisRequest(BaseModel):
    code: str
    file_extension: str
    line_number: int
    class Config:
        extra = "forbid"

# Model for requests to the Code Validator
class SyntaxCheckRequest(BaseModel):
    file_extension: str
    code: str

# Model for response from the Code Validator
class SyntaxCheckResponse(BaseModel):
    user_prompt: str

# Model for request to the LLM
class LLMRequest(BaseModel):
    user_prompt: str
    system_prompt: str = ""

# Model for the LLMs response
class LLMResponse(BaseModel):
    input_token_num: int
    output_token_num: int
    generation_time: float
    llm_output: str

# Model for the request to the Report Generator
class GenerateReportRequest(BaseModel):
    llm_output: str
    user_id: str
    file_extension: str
    analyzed_code: str
    starting_line_number: int

# Model for the response from the Report Generator
class GenerateReportResponse(BaseModel):
    encoded_summary: str
    encoded_full: str

# Model for the request to the Web Server
class StoreReportRequest(BaseModel):
    report_full: str
