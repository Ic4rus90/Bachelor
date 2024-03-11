# Uses an official PyTorch image as a base
FROM pytorch/pytorch:2.2.1-cuda12.1-cudnn8-runtime
# Set the working directory in the container
WORKDIR /usr/src/app
# Copy the application source files into the container
COPY src/ .
# Install requirements
RUN pip install --no-cache-dir -r requirements.txt

# Mark volume
VOLUME ["/usr/src/logs"]

# Expose the port that the app runs on
EXPOSE 30003

# Starts the app within the container
ENTRYPOINT ["uvicorn"]
CMD ["main:app", "--host", "0.0.0.0", "--port", "30003"]
