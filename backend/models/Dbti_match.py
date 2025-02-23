import uuid
from sqlalchemy import Column, Integer, String, Boolean, Float, Text, ForeignKey, DateTime, Interval
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    # 아래 부분이 질문에서 주신 코드와 동일한 형태
    uuid_id = Column(UUID(as_uuid=True), unique=True, nullable=False, default=uuid.uuid4)
    user_id = Column(String, unique=True, nullable=False)  # 로그인용
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    phone_number = Column(String, nullable=True)
    address = Column(String, nullable=True)
    nickname = Column(String, nullable=True)
    is_walker = Column(Boolean, default=False)

    # Trainer로 쓰는 경우라면 (예: is_walker=True), Trainer 테이블과 연결할 수도 있음
    # trainer = relationship("Trainer", back_populates="user", uselist=False)
    # pets = relationship("Pet", back_populates="user")


class Trainer(Base):
    __tablename__ = "trainers"

    id = Column(Integer, primary_key=True, index=True)
    uuid_id = Column(UUID(as_uuid=True), unique=True, nullable=False, default=uuid.uuid4)
    # user_id = Column(Integer, ForeignKey("users.id"), nullable=True)  # Users와 연결이 필요하다면
    name = Column(String, nullable=False)
    address = Column(String, nullable=True)
    introduction = Column(Text, nullable=True)
    experience = Column(Integer, default=0)  # 경력(년 수)
    rating = Column(Float, default=0)
    is_verified = Column(Boolean, default=False)
    image_url = Column(String, nullable=True)
    trainer_mbti = Column(String, nullable=True)
    trainer_image_url = Column(String, nullable=True)

    match_scores = relationship("MatchScore", back_populates="trainer")


class Pet(Base):
    __tablename__ = "pets"

    id = Column(Integer, primary_key=True, index=True)
    uuid_id = Column(UUID(as_uuid=True), unique=True, nullable=False, default=uuid.uuid4)
    # user_id = Column(Integer, ForeignKey("users.id"), nullable=True)  # 펫 주인이 누구인지 연결할 때 사용
    name = Column(String, nullable=False)
    breed = Column(String, nullable=True)
    size = Column(String, nullable=True)
    weight = Column(Float, nullable=True)
    gender = Column(String, nullable=True)
    notes = Column(Text, nullable=True)
    pet_mbti = Column(String, nullable=True)
    is_neutered = Column(Boolean, default=False)
    image_url = Column(String, nullable=True)
    birth_date = Column(String, nullable=True)

    match_scores = relationship("MatchScore", back_populates="pet")


class MatchScore(Base):
    """
    매칭 계산 결과를 저장하는 테이블
    """
    __tablename__ = "match_scores"

    id = Column(Integer, primary_key=True, index=True)
    pet_id = Column(Integer, ForeignKey("pets.id"), nullable=False)
    trainer_id = Column(Integer, ForeignKey("trainers.id"), nullable=False)
    mbti_match_score = Column(Float, default=0)
    activity_match_score = Column(Float, default=0)
    total_match_score = Column(Float, default=0)

    pet = relationship("Pet", back_populates="match_scores")
    trainer = relationship("Trainer", back_populates="match_scores")


class Match(Base):
    """
    실제 산책/예약 매칭 정보(스케줄, 거리, 걸음 수 등)를 저장할 수 있는 테이블
    """
    __tablename__ = "matches"

    id = Column(Integer, primary_key=True, index=True)
    uuid_id = Column(UUID(as_uuid=True), unique=True, nullable=False, default=uuid.uuid4)
    pet_id = Column(Integer, ForeignKey("pets.id"), nullable=False)
    trainer_id = Column(Integer, ForeignKey("trainers.id"), nullable=False)
    schedule = Column(DateTime, nullable=True)
    status = Column(String, nullable=True)
    route = Column(Text, nullable=True)
    distance = Column(Float, default=0)
    walk_duration = Column(Interval, nullable=True)
    steps = Column(Integer, default=0)

    # pet = relationship("Pet", backref="matches")
    # trainer = relationship("Trainer", backref="matches")
