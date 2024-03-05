# Use the official image as a parent image
FROM python:3.12-slim
# Set the working directory in the container
WORKDIR /usr/src/app
# Make directories for logs and source code
RUN mkdir logs && mkdir src
# Set the log directory as a volume
VOLUME ["/usr/src/app/logs"]
# Set new working directory to the source code directory
WORKDIR /usr/src/app/src
# Install requirements
COPY src/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
# Copy over the source code
COPY src .

EXPOSE 30001
# Start the service with uvicorn
ENTRYPOINT ["uvicorn"]
CMD ["main:app", "--host", "0.0.0.0", "--port", "30001"]