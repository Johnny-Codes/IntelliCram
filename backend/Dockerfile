FROM python:3.10-slim

# Set the working directory
WORKDIR /app

# Copy requirements and application files
COPY ./backend/requirements.txt requirements.txt
COPY ./backend/main.py main.py
# COPY start.sh start.sh
# RUN chmod +x /start.sh

# Copy directories
COPY ./backend/migrations migrations
COPY ./backend/openai_stuff openai_stuff
COPY ./backend/models models
COPY ./backend/repos repos
COPY ./backend/routers routers

# Install dependencies
RUN python -m pip install --upgrade pip \
    && python -m pip install -r requirements.txt

# Specify the CMD to run your application
CMD uvicorn backend.main:app --host 0.0.0.0 --port $PORT
