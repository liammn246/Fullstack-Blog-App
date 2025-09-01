from fastapi import FastAPI
from backend.database import engine, Base
from backend import routes
from backend.models import User,Post
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(routes.auth_router)
app.include_router(routes.posts_router)

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=['*'],
    allow_headers=['*'],
)

Base.metadata.create_all(bind=engine)

