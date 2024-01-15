FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /app

COPY ./backend .

RUN python -m pip install -r requirements.txt

# CMD python -m migrations up && uvicorn main:app --host 0.0.0.0 --port 8000 --reload
CMD python -m migrations up && uvicorn main:app --host 0.0.0.0 --port ${PORT}