from datetime import timedelta, datetime
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jose import jwt, JWTError
from backend.database import get_db
from fastapi import APIRouter, Depends, HTTPException
from typing import Annotated
from sqlalchemy.orm import Session
from fastapi import status

auth_router = APIRouter(
    prefix='/auth',
    tags=['Auth']
)

db_dependency = Annotated[Session, Depends(get_db)]