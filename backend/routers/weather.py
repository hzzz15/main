from fastapi import APIRouter
from services.weather_service import get_weather
from schemas.weather_schema import WeatherResponse

router = APIRouter()

@router.get("/seoul", response_model=WeatherResponse)
def get_seoul_weather():
    city = "Seoul"
    weather_data = get_weather(city)

    if not weather_data:
        return {"error": "Weather data not found"}

    return WeatherResponse(**weather_data)  
