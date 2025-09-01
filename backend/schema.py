from pydantic import BaseModel
from typing import Optional 

class CreatePost(BaseModel):
    content: str

class CreateUser(BaseModel):
    username: str
    password: str

class UserSchema(BaseModel):
    id: int
    username: str
    class Config:
        orm_mode=True

class PostResponse(BaseModel):
    id: int
    user: UserSchema
    content: str
    
    class Config:
        orm_mode = True