from pydantic import BaseModel


class UploadFileIn(BaseModel):
    name: str
    file: str


class UploadFileOut(BaseModel):
    id: int
    name: str
    user_id: int
    file_path: str
