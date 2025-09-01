from fastapi import Depends, APIRouter, HTTPException, status
from sqlalchemy.orm import Session
from typing import Annotated, List
from backend.database import get_db
from backend.models import User,Post
from backend.schema import CreatePost, PostResponse
from backend.utils.security import get_current_user

posts_router = APIRouter(
    prefix='/posts',
    tags=['Posts']
)

db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[Session, Depends(get_current_user)]

@posts_router.get('/all', response_model=List[PostResponse])
def all_posts(db: db_dependency):
    posts = db.query(Post).all()
    return posts

@posts_router.post('/')
def create_post(data: CreatePost, db: db_dependency, user: user_dependency):
    if db.query(User).where(User.username == user['username']).one_or_none() == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    new_post = Post(content=data.content, user_id=user['id'])
    db.add(new_post)
    db.commit()
    return {'message':'Post created'}
