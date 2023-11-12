from pydantic import BaseModel
from enum import Enum

class UserRole(str, Enum):
    admin = "admin"
    instructor = "instructor"
    student = "student"

class UserIn(BaseModel):
    username: str
    first_name: str
    last_name: str
    role: UserRole
    email: str

class UserOut(UserIn):
    id: int
    disabled: bool
    hashed_password: str
