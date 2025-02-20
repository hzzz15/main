from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)

    phone_number = Column(String, nullable=True)  # ✅ 추가
    address = Column(String, nullable=True)  # ✅ 추가
    nickname = Column(String, nullable=True)  # ✅ 추가
    is_walker = Column(Boolean, default=False)  # ✅ 추가

class Pet(Base):
    __tablename__ = "pets"

    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String, nullable=False)
    breed = Column(String, nullable=False)
    age = Column(Integer)
    weight = Column(Integer)
    is_neutered = Column(Boolean)
