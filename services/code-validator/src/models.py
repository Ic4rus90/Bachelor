from pydantic import BaseModel

# Model for requests to code-validator
class SyntaxCheckRequest(BaseModel):
    file_extension: str
    code: str

# Model for responses from code-validator
class SyntaxCheckResponse(BaseModel):
    user_prompt: str