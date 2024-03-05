from fastapi import FastAPI, HTTPException
from validators.syntax_checker import check_syntax_by_extension
from logger import logger, set_up_logger
from models import SyntaxCheckRequest, SyntaxCheckResponse
from encoder import decode_code, encode_code


app = FastAPI()

set_up_logger()

# Route for checking the syntax of the code
@app.post("/check-syntax/")
async def check_syntax(request: SyntaxCheckRequest):
    code = decode_code(request.code)
    try:
        check_syntax_by_extension(code, request.file_extension)
        return SyntaxCheckResponse(user_prompt=encode_code(code))
    except ValueError as e:
        if str(e) == "Invalid file extension":
            logger.error(f"Raising 422 due to invalid file extension: {request.file_extension}")
            raise HTTPException(status_code=422, detail="Invalid file extension")
        logger.error(f"Error occured: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
    except SyntaxError as e:
        logger.error(f"Syntax error: {e}")
        raise HTTPException(status_code=400, detail="Invalid code")
    except Exception as e:
        logger.error(f"Error occured: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=30002)
    