from fastapi import FastAPI, HTTPException

from report_transformer import generate_reports
from logger import set_up_logger, logger
from config import INPUT_SCHEMA
from models import TransformRequest, TransformResponse


app = FastAPI()


set_up_logger()


# Endpoint to generate and return both summary and full reports
@app.post("/generate-report", response_model=TransformResponse)
async def generate_report(request: TransformRequest):
    try:
        reports = await generate_reports(request)
        return reports
    except ValueError as e:
        if str(e) == "Validation of JSON schema failed":
            raise HTTPException(status_code=400, detail="Input data does not match the required schema")
    except Exception as e:
        logger.error(f"An error occurred while generating reports: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while generating reports")
        

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=30004)