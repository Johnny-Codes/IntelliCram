from fastapi import (UploadFile, File, APIRouter,)
from uuid import uuid4
import os

router = APIRouter()


@router.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    file_location = f"media_uploads/{str(uuid4())}.pdf"
    with open(file_location, "wb+") as file_object:
        file_object.write(await file.read())
    return {"file_path": file_location}
