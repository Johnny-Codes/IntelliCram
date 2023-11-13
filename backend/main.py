from fastapi import FastAPI
from routers import (
    user_routers,
    class_routers,
)

app = FastAPI()

app.include_router(user_routers.router, tags=["user"])
app.include_router(class_routers.router, tags=["classroom"])
