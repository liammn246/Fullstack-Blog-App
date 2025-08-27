from datetime import timedelta, datetime
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jose import jwt, JWTError
from backend.database import get_db
from fastapi import APIRouter, Depends, HTTPException
from typing import Annotated
from sqlalchemy.orm import Session
from fastapi import status
from backend.schema import CreateUser
from backend import utils
from backend.models import User

bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated='auto')
oauth2_bearer = OAuth2PasswordBearer(tokenUrl='auth/login')

auth_router = APIRouter(
    prefix='/auth',
    tags=['Auth']
)

db_dependency = Annotated[Session, Depends(get_db)]

@auth_router.post('/user', status_code=status.HTTP_201_CREATED)
def create_user(data: CreateUser, db: db_dependency):
    new_user = User(username=data.username, hashed_password=bcrypt_context.hash(data.password))
    db.add(new_user)
    db.commit()
    return {'message':'Created successfully'}

@auth_router.post('/login')
def login_for_token(data: Annotated[OAuth2PasswordRequestForm, Depends()], db: db_dependency):
    user = utils.authenticate_user(data.username, data.password, db)
    if user is False:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate user")
    token = utils.create_access_token(user.username, user.id, timedelta(minutes=20))
    return {'access_token':token, 'token_type':'bearer'}