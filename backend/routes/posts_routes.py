from fastapi import Depends, APIRouter
from sqlalchemy.orm import Session
from typing import Annotated
from backend.database import get_db
from backend.models import User,Post

posts_router = APIRouter(
    prefix='/posts',
    tags=['Posts']
)

db_dependency = Annotated[Session, Depends(get_db)]

@posts_router.get('/all')
def all_posts(db: db_dependency):
    posts = db.query(Post).all()
    return posts