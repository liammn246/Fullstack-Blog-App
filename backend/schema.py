from pydantic import BaseModel
from typing import Optional 

class CreatePost(BaseModel):
    content: str