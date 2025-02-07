import httpx
from fastapi import HTTPException

KAKAO_API_KEY = "9ddff3ec83797a734367e70f94889372"

async def get_coordinates_from_address(address: str):
    url = f"https://dapi.kakao.com/v2/local/search/address.json?query={address}"
    headers = {"Authorization": f"KakaoAK {KAKAO_API_KEY}"}

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="주소 변환 실패")

    data = response.json()
    if not data["documents"]:
        raise HTTPException(status_code=404, detail="결과를 찾을 수 없습니다.")

    # 첫 번째 결과 반환
    result = data["documents"][0]
    return {"latitude": result["y"], "longitude": result["x"]}
