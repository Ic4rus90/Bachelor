from pydantic import BaseModel

# Model for requests to this service
class TransformRequest(BaseModel):
    llm_output: str
    user_id: str
    file_extension: str
    analyzed_code: str
    starting_line_number: int

# Model for responses from this service
class TransformResponse(BaseModel):
    encoded_summary: str
    encoded_full: str
