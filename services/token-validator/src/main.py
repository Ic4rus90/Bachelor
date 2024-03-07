from fastapi import FastAPI, HTTPException
from logger import set_up_logger
from token_validator import verify_token, get_user_id
from config import JWKS_URL
from jwks_client import JWKSClient
from models import GenerateRequest, GenerateResponse

app = FastAPI()

set_up_logger()

# Initialize JWKSClient
jwks_client = JWKSClient(jwks_url=JWKS_URL)

@app.post("/verify-token/", response_model=GenerateResponse)
async def verify(request: GenerateRequest):
    is_valid = verify_token(request, jwks_client)
    if is_valid:
        user_id = get_user_id(request.token)
        return GenerateResponse(user_id=user_id)
    else:
        raise HTTPException(status_code=401, detail="Token is invalid.")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=30001)