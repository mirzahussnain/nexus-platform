from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from core.config import load_config
from routes.analyze import router as analyze_router
from core.loggin import setup_logger

# 1. Define the Lifespan
@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Initializing NLP and Urgency Config...")
    app.state.config = load_config()
    app.state.logger = setup_logger()
    
    yield  # The app runs here
    
    print("Cleaning up resources...")
    app.state.config.clear()

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows ALL origins (Phone, Web, Postman)
    allow_credentials=True,
    allow_methods=["*"],  # Allows ALL methods (POST, GET, OPTIONS)
    allow_headers=["*"],  # Allows ALL headers
)

app.include_router(analyze_router)


@app.get("/")
def health_check():
    return {"status": "AI Service is Online"}