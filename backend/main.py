from fastapi import FastAPI
from backend.database import engine, Base
from backend import routes
from backend.models import User,Post

app = FastAPI()
app.include_router(routes.auth_router)
app.include_router(routes.posts_router)
Base.metadata.create_all(bind=engine)

