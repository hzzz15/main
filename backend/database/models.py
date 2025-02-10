from sqlalchemy.ext.automap import automap_base
from database.db import engine

# 기존 DB 테이블 자동 매핑
Base = automap_base()
Base.prepare(engine, reflect=True)

# 테이블 가져오기
User = Base.classes.users
Pet = Base.classes.pets
Trainer = Base.classes.trainers
MatchScore = Base.classes.match_scores

