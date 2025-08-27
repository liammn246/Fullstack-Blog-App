from pydantic import BaseModel
from typing import Optional 

class CreatePost(BaseModel):
    content: str

class CreateUser(BaseModel):
    username: str
    password: str