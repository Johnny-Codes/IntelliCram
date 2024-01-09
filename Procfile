web: python migrations up && uvicorn main:app --host 0.0.0.0 --port ${PORT}
release: python -m migrations up && uvicorn main:app --host
assets: npm install && npm run build