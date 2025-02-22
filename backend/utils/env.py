import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
AI_API_KEY = os.getenv("AI_API_KEY")
