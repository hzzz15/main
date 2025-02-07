from fastapi import APIRouter, Query
from backend.services.address import get_coordinates_from_address
from backend.schemas.address import AddressResponse

router = APIRouter()

@router.get("/convert-address", response_model=AddressResponse)
async def convert_address(address: str = Query(..., description="변환할 주소")):
    return await get_coordinates_from_address(address)
