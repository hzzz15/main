from fastapi import FastAPI
from backend.routers.address import router as address_router

app = FastAPI()

@app.get("/")
async def read_root():
    return {"message": "FastAPI server is running!"}

# 라우터 등록
app.include_router(address_router, prefix="/api", tags=["Address"])
