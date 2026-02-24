# Use official slim Python image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend files
COPY . .

# Expose port
EXPOSE 8000

# Command to run the application (Uvicorn)
CMD sh -c "uvicorn index:app --host 0.0.0.0 --port ${PORT:-8000}"
