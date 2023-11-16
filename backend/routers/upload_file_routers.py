from fastapi import (UploadFile, File, APIRouter, Depends,)
from uuid import uuid4
import os
from models.upload_file_models import UploadFileOut, UploadFileIn
from models.user_models import UserIn
from routers.user_routers import get_current_active_user
from repos.upload_file_repo import UploadFileRepo

router = APIRouter()


@router.post("/upload/")
async def upload_pdf_file(file: UploadFile = File(...), 
                          model: UploadFileIn = Depends(), 
                          current_user: UserIn = Depends(get_current_active_user),
                          repo: UploadFileRepo = Depends()):
    allowed_extensions = ['pdf']
    if file.filename.split('.')[-1] not in allowed_extensions:
        return "Invalid file type. Please upload a PDF file."
    directory = f"media_uploads/{str(current_user.id)}"
    if not os.path.exists(directory):
        os.makedirs(directory)
    file_location = f"{directory}/{str(uuid4())}.pdf"
    with open(file_location, "wb+") as file_object:
        file_object.write(await file.read())
    save_to_database = repo.create(file_location, current_user.id, model.name)
    return save_to_database


@router.get("/upload/{file_id}")
async def read_upload_file(file_id: int, repo: UploadFileRepo = Depends()):
    return repo.read(file_id)


@router.delete("/upload/{file_id}")
async def delete_upload_file(file_id: int, repo: UploadFileRepo = Depends()):
    file_to_delete = repo.read(file_id)
    if file_to_delete is not None:
        os.remove(file_to_delete.file_path)
    return repo.delete(file_id)
