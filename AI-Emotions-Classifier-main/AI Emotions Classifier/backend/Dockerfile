# Use an official Python runtime as a parent image
FROM python:3.9-slim-buster

# Set the working directory to /app
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Set the FLASK_APP environment variable
ENV FLASK_APP=server.py

# Expose port 5000 for the Flask backend
EXPOSE 5000

# Start the Flask server
CMD ["ls", "-la"]
