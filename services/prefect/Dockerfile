# Use the official Python base image
FROM python:3.12-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the requirements file to the container
COPY src/requirements.txt .

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code to the container
COPY src/ .

# Expose the port
EXPOSE 30000

# Mark volume
VOLUME ["/usr/src/app/logs"]

# Set the entrypoint command for the container
ENTRYPOINT ["uvicorn"]
CMD ["main:app", "--host", "0.0.0.0", "--port", "30000"]