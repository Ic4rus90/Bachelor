
FROM pytorch/pytorch:2.2.1-cuda12.1-cudnn8-runtime
WORKDIR /usr/src/app
COPY src/ .
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 8300
ENTRYPOINT ["uvicorn"]
CMD ["main:app", "--host", "0.0.0.0", "--port", "8300"]
