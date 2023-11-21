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
    role: str
    email: str
    password: str


class UserOut(BaseModel):
    id: int
    username: str
    first_name: str
    last_name: str
    role: UserRole
    email: str
    disabled: bool
    hashed_password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str or None = None


class TokenIn(BaseModel):
    access_token: str
