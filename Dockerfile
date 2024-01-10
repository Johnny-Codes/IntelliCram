# Build stage for backend
FROM python:3.10-slim AS backend

WORKDIR /app/backend

COPY ./backend /app/backend

RUN python -m pip install --upgrade pip \
    && python -m pip install -r requirements.txt

WORKDIR /app

CMD python -m pip install uvicorn[standard]

CMD uvicorn backend.main:app --host 0.0.0.0 --port $PORT

# Build stage for frontend
FROM node:21-bullseye AS frontend

WORKDIR /app/frontend

COPY ./frontend /app/frontend

RUN npm install
RUN npm run build

CMD uvicorn backend.main:app --host 0.0.0.0 --port $PORT
