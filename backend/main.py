import os
# import uvicorn
from fastapi import FastAPI
from routers import (
    user_routers,
    class_routers,
    deck_routers,
    card_routers,
    quiz_routers,
    upload_file_routers,
)

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.getenv("VITE_API_URL"),
        os.getenv("FASTAPI_API_URL"),
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_routers.router, tags=["user"])
app.include_router(class_routers.router, tags=["classroom"])
app.include_router(deck_routers.router, tags=["deck"])
app.include_router(card_routers.router, tags=["card"])
app.include_router(quiz_routers.router, tags=["quiz"])
app.include_router(upload_file_routers.router, tags=["upload_files"])

# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8000)
