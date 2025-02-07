from pydantic import BaseModel

class AddressResponse(BaseModel):
    latitude: str
    longitude: str
