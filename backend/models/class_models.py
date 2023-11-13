from pydantic import BaseModel
from models.user_models import UserOut


class ClassroomIn(BaseModel):
    name: str
    user_id: int
