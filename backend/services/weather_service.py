import requests

API_KEY = "59648956232be7bc7f53e5bebe08c609"

def get_weather(city: str):
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}"
    
    response = requests.get(url)
    if response.status_code != 200:
        return None  # 요청 실패 시 None 반환
    
    data = response.json()
    
    return {
        "city": data["name"],
        "temperature": round(data["main"]["temp"] - 273.15, 1),
        "temp_min": round(data["main"]["temp_min"] - 273.15, 1),
        "temp_max": round(data["main"]["temp_max"] - 273.15, 1),
        "wind_speed": data["wind"]["speed"],
        "rain_probability": round(data.get("rain", {}).get("1h", 0) * 10, 1),
        "weather_icon": f"https://openweathermap.org/img/wn/{data['weather'][0]['icon']}.png",
    }
