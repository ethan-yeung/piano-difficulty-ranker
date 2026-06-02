from sqlalchemy import Column, Integer, String, Float, DateTime
from database import Base
from datetime import datetime, timezone

class Rating(Base):
    __tablename__ = "ratings"
    id = Column(Integer, primary_key=True, index=True)
    piece_id = Column(Integer)
    elo = Column(Float, default=1500.0)
    win_count = Column(Integer, default=0)
    loss_count = Column(Integer, default=0)
    vote_type = Column(String)

class Vote(Base):
    __tablename__ = "votes"
    id = Column(Integer, primary_key=True, index=True)
    winner_piece_id = Column(Integer)
    loser_piece_id = Column(Integer)
    session_id = Column(String)
    vote_type = Column(String)
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))