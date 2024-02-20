FROM python:3.9-slim
WORKDIR /usr/src/app
RUN mkdir logs && mkdir src
VOLUME ["/usr/src/app/logs"]
WORKDIR /usr/src/app/src
COPY src/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY src .
EXPOSE 8200
ENTRYPOINT ["uvicorn"]
CMD ["main:app", "--host", "0.0.0.0", "--port", "8200"]