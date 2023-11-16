from fastapi import FastAPI
from routers import (
    user_routers,
    class_routers,
    deck_routers,
    card_routers,
    quiz_routers,
    upload_file_routers,
)

app = FastAPI()

app.include_router(user_routers.router, tags=["user"])
app.include_router(class_routers.router, tags=["classroom"])
app.include_router(deck_routers.router, tags=["deck"])
app.include_router(card_routers.router, tags=["card"])
app.include_router(quiz_routers.router, tags=["quiz"])
app.include_router(
    upload_file_routers.router, tags=["upload_files"], prefix="/upload_files"
)
