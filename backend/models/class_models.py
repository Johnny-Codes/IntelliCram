from pydantic import BaseModel
from models.user_models import UserOut


class ClassroomIn(BaseModel):
    name: str


class ClassroomOut(ClassroomIn):
    id: int
    user_id: int
