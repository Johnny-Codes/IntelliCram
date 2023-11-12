from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, status, APIRouter
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from models.user_models import UserIn, UserOut

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def fake_decode_token(token):
    return UserIn(
        username=token + "fakedecoded", 
        email="john@example.com", 
        first_name="John", 
        last_name="Doe", 
        role="admin",
    )

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    user = fake_decode_token(token)
    return user

@router.get("/users/me")
async def read_users_me(current_user: Annotated[UserIn, Depends(get_current_user)]):
    return current_user

@router.get("/items/")
async def read_items(token: Annotated[str, Depends(oauth2_scheme)]):
    return {"token": token}