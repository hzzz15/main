from fastapi import FastAPI, Depends
from routers import weather, user, bti_match, pets
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response

app = FastAPI()

# CORS 설정 (React와 통신 가능하도록 허용)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 특정 도메인만 허용할 수도 있음 (ex. "http://localhost:3000")
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# weather.py의 라우터 등록
app.include_router(weather.router, prefix="/weather", tags=["Weather"])
app.include_router(user.router)
app.include_router(pets.router)
app.include_router(bti_match.router, tags=["Matching"])

@app.get("/")
async def root():
    return {"message": "Hello from FastAPI!"}

@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return Response(status_code=204)
