FROM python:3.10-slim

# Create a non-root user
RUN adduser --disabled-password myuser
USER myuser

# Set the working directory
WORKDIR /app

# Copy requirements and application files
COPY requirements.txt requirements.txt
COPY main.py main.py
COPY start.sh start.sh
RUN chmod +x /start.sh

# Copy directories
COPY migrations migrations
COPY models models
COPY repos repos
COPY routers routers
COPY Dockerfile.production Dockerfile.production

# Install dependencies
RUN python -m pip install --upgrade pip \
    && python -m pip install -r requirements.txt

# Specify the CMD to run your application
CMD ["./start.sh"]
