from pydantic import BaseModel

class WeatherResponse(BaseModel):
    city: str
    temperature: float
    temp_min: float
    temp_max: float
    wind_speed: float
    rain_probability: float
    weather_icon: str
