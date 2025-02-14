from fastapi import FastAPI
from backend.routers import users, Dbti_router, auth
from backend.routers.bti_match import router as bti_match

from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response

app = FastAPI()

# CORS 설정 (React와 통신 가능하도록 허용)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# weather.py의 라우터 등록
app.include_router(users.router)
app.include_router(bti_match, prefix="/api")
app.include_router(Dbti_router.router, prefix="/api")
app.include_router(auth.router, prefix="/api/auth")

@app.get("/")
async def root():
    return {"message": "Hello from FastAPI!"}

@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return Response(status_code=204)
