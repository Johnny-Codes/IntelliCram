from pydantic import BaseModel


class UploadFileIn(BaseModel):
    name: str


class UploadFileOut(UploadFileIn):
    id: int
    file_path: str