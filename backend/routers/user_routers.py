from typing import Annotated
import os
import json
from fastapi import Depends, FastAPI, HTTPException, status, APIRouter
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from repos.pool import pool
from repos.user_repo import UserRepo
from models.user_models import (
    UserIn,
    UserOut,
    Token,
    TokenData,
    UserRole,
    Token,
    TokenIn,
)

router = APIRouter()
password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
SECRET_KEY = os.environ["SECRET_KEY"]
ALGORITHM = os.environ["ALGORITHM"]
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.environ["ACCESS_TOKEN_EXPIRE_MINUTES"])


def verify_password(plain_password, hashed_password):
    return password_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return password_context.hash(password)


def get_user(username: str):
    try:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                        SELECT *
                        FROM users
                        WHERE username = %s;
                    """,
                    [username],
                )
                record = result.fetchone()
                return UserOut(
                    id=record[0],
                    username=record[1],
                    first_name=record[2],
                    last_name=record[3],
                    email=record[4],
                    role=UserRole(record[5]),
                    disabled=record[6],
                    hashed_password=record[7],
                )

    except Exception as e:
        print(e)
        return {"message": "Could not find account"}


def authenticate_user(username: str, password: str):
    user = get_user(username)
    print("========================= user", user, type(user))
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta or None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)], repo: UserRepo = Depends()
):
    credential_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Athenticaiton": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credential_exception

        token_data = TokenData(username=username)
    except JWTError:
        raise credential_exception
    user = repo.get(username=token_data.username)
    if user is None:
        raise credential_exception
    return user


async def get_current_active_user(
    current_user: UserIn = Depends(get_current_user),
):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive User")
    return current_user


@router.post("/users/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    print('login form data', form_data)
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_ANAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Athenticaiton": "Bearer"},
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    # Save the access token in the frontend React by setting it in the state or local storage
    # Example of setting in state:
    # setAccessToken(access_token)
    return {"access_token": access_token, "token_type": "bearer"}


@router.delete("/users/me")
async def delete_user(
    current_user: UserIn = Depends(get_current_active_user),
    repo: UserRepo = Depends(),
):
    try:
        deleted_user = repo.delete(current_user.username)
        # Assuming delete_user returns the deleted user information
        # Add something to log the user out
        return {"message": "User deleted successfully"}
    except Exception as e:
        print(e)
        return {"message": "Could not delete user"}


@router.post("/users/create")
async def create_user(user_info: UserIn, repo: UserRepo = Depends()):
    hashed_password = get_password_hash(user_info.password)
    try:
        user = repo.create(
            user_info, hashed_password=hashed_password
        )
        print('user', user)
        # can't get the login function to work...
        # if user.username:
        #     form_data = OAuth2PasswordRequestForm(
        #         username=user.username, password=user_info.password
        #     )
        #     x = login(form_data=form_data)
        return user
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Cannot create an account with those credentials {e}",
        )