from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, Depends, Cookie, Response
from pydantic import BaseModel
from enum import Enum
from contextlib import asynccontextmanager
from database import engine, SessionLocal, Base, get_db
from models import Rating, Vote
from sqlalchemy.orm import Session
from sqlalchemy import func, or_, and_
import random
import uuid
from datetime import datetime, timezone, timedelta
import os

def seed_ratings(db):
    for piece in pieces:
        for vote_type in ["player", "listener"]:
            existing = db.query(Rating).filter(
            Rating.piece_id == piece.id,
            Rating.vote_type == vote_type
            ).first()
            if existing is None:
                db.add(Rating(piece_id=piece.id, vote_type=vote_type))
    
    db.commit()


@asynccontextmanager
async def lifespan(app: FastAPI):
    
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_ratings(db)
    finally:
        db.close()
    yield


app = FastAPI(lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://rankey-nine.vercel.app",
        "https://rankey.app",
        "https://www.rankey.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SortField(str, Enum):
    id = "id"
    tier = "tier"
    title = "title"
    composer = "composer"
    technicality = "technicality"
    musicality = "musicality"
    rhythmic_complexity = "rhythmic_complexity"
    endurance = "endurance"
    ornamentation = "ornamentation"
    overall = "overall"

class Piece(BaseModel):
    id: int
    tier: str
    title: str
    composer: str
    technicality: float
    musicality: float
    rhythmic_complexity: float
    endurance: float
    ornamentation: float
    overall: float
    youtube_url: str = ""

class VoteRequest(BaseModel):
    winner_piece_id: int
    loser_piece_id: int
    vote_type: str

pieces = [
    # Beginner
    Piece(id=1, tier="Beginner", title="Minuet in G Major", composer="Bach",
          technicality=1.0, musicality=3.0, rhythmic_complexity=0.5,
          endurance=1.5, ornamentation=2.0, overall=1.7, youtube_url="https://youtu.be/icZob9-1MDw?si=y6M1baHvRQhF9rnh"),
    Piece(id=2, tier="Beginner", title="Sonatina in C Major, Op. 36 No. 1", composer="Clementi",
          technicality=2.0, musicality=3.5, rhythmic_complexity=1.5,
          endurance=1.5, ornamentation=0.5, overall=2.2, youtube_url="https://youtu.be/Ryq0nX1_Jds?si=47_f-jGzE2pe1MPG"),
    Piece(id=3, tier="Beginner", title="Arabesque, Op. 100 No. 2", composer="Burgmüller",
          technicality=1.5, musicality=2.5, rhythmic_complexity=2.0,
          endurance=1.0, ornamentation=0.5, overall=1.7, youtube_url="https://youtu.be/1oMm_n38OxQ?si=y2yr8NsW8ez4HF_m"),
 
    # Late Beg / Early Inter
    Piece(id=4, tier="Late Beg / Early Inter", title="Prelude in A Major, Op. 28 No. 7", composer="Chopin",
          technicality=2.0, musicality=3.5, rhythmic_complexity=1.5,
          endurance=1.5, ornamentation=0.0, overall=2.1, youtube_url="https://youtu.be/yLU4wgtpjGs?si=4_k7lnpJfk7xaQGw"),
    Piece(id=5, tier="Late Beg / Early Inter", title="Prelude in C Major (WTC Book 1)", composer="Bach",
          technicality=2.0, musicality=4.0, rhythmic_complexity=1.5,
          endurance=2.0, ornamentation=0.0, overall=2.3, youtube_url="https://youtu.be/frxT2qB1POQ?si=JFIxnKIZkfw_6at7"),
    Piece(id=6, tier="Late Beg / Early Inter", title="Gymnopédie No. 1", composer="Satie",
          technicality=1.5, musicality=3.5, rhythmic_complexity=2.0,
          endurance=2.5, ornamentation=0.0, overall=2.2, youtube_url="https://youtu.be/2WfaotSK3mI?si=06ojj8tvHURwuR13"),
    Piece(id=7, tier="Late Beg / Early Inter", title="Sonata No. 16, K. 545, 1st Movement", composer="Mozart",
          technicality=2.0, musicality=7.0, rhythmic_complexity=2.5,
          endurance=2.0, ornamentation=2.0, overall=3.6, youtube_url="https://youtu.be/qjk-YRuQZDE?si=RFuYhl9haRVqKJsq"),
    Piece(id=8, tier="Late Beg / Early Inter", title="Solfeggietto", composer="C.P.E. Bach",
          technicality=3.0, musicality=3.0, rhythmic_complexity=2.0,
          endurance=2.0, ornamentation=0.0, overall=2.4, youtube_url="https://youtu.be/SDdAlB44M8o?si=ILvv1K-_F8QAsEcT"),
    Piece(id=9, tier="Late Beg / Early Inter", title="Waltz in A Minor, B. 150 (Op. Posth.)", composer="Chopin",
          technicality=2.5, musicality=4.5, rhythmic_complexity=2.5,
          endurance=2.0, ornamentation=2.5, overall=3.0, youtube_url="https://youtu.be/eN5z1mu6j4M?si=-hkZ4oPuOby9dwPf"),
    Piece(id=10, tier="Late Beg / Early Inter", title="Passacaglia", composer="Handel/Halvorsen",
          technicality=3.5, musicality=5.0, rhythmic_complexity=2.0,
          endurance=2.0, ornamentation=0.0, overall=3.2, youtube_url="https://youtu.be/GAIZxaToV2A?si=BmMBZDu3m4g1Cjl7"),
    Piece(id=11, tier="Late Beg / Early Inter", title="Canon in D", composer="Pachelbel",
          technicality=2.5, musicality=4.5, rhythmic_complexity=2.5,
          endurance=2.0, ornamentation=0.0, overall=2.8, youtube_url="https://youtu.be/6jSLH9CDPPQ?si=J5YQtBMbaZx8J3tw"),
 
    # Intermediate
    Piece(id=12, tier="Intermediate", title="Für Elise", composer="Beethoven",
          technicality=3.5, musicality=4.0, rhythmic_complexity=2.0,
          endurance=3.0, ornamentation=1.0, overall=3.1, youtube_url="https://youtu.be/wfF0zHeU3Zs?si=wX4ggnY25vNL_iQ6"),
    Piece(id=13, tier="Intermediate", title="Arabesque No. 1", composer="Debussy",
          technicality=3.5, musicality=5.0, rhythmic_complexity=3.5,
          endurance=3.0, ornamentation=0.5, overall=3.6, youtube_url="https://youtu.be/cVYH-7QGE-A?si=FEcPHdNcwH0ECKlK"),
    Piece(id=14, tier="Intermediate", title="Nocturne in C# minor, No. 20", composer="Chopin",
          technicality=3.5, musicality=7.0, rhythmic_complexity=3.0,
          endurance=2.5, ornamentation=2.5, overall=4.2, youtube_url="https://youtu.be/DqpPRj6UZqc?si=jj5sAS4GjPcpDPA1"),
    Piece(id=15, tier="Intermediate", title="Clair de Lune", composer="Debussy",
          technicality=4.0, musicality=7.0, rhythmic_complexity=4.0,
          endurance=3.5, ornamentation=1.0, overall=4.5, youtube_url="https://youtu.be/WNcsUNKlAKw?si=mLE__D93-k2Eva3t"),
    Piece(id=16, tier="Intermediate", title="Nocturne Op. 9 No. 2 in E♭ major", composer="Chopin",
          technicality=4.0, musicality=7.0, rhythmic_complexity=3.0,
          endurance=3.0, ornamentation=5.0, overall=4.7, youtube_url="https://youtu.be/p29JUpsOSTE?si=4E0oE2g1cZWB0kkN"),
    Piece(id=17, tier="Intermediate", title="Prelude in E minor, Op. 28 No. 4", composer="Chopin",
          technicality=2.0, musicality=5.0, rhythmic_complexity=2.5,
          endurance=1.5, ornamentation=1.0, overall=2.8, youtube_url="https://youtu.be/CU9RgI9j7Do?si=ZRvVzjCzpAmyENw0"),
    Piece(id=18, tier="Intermediate", title="Rondo alla Turca (K. 331, 3rd Mvt)", composer="Mozart",
          technicality=4.5, musicality=5.5, rhythmic_complexity=3.0,
          endurance=3.0, ornamentation=3.0, overall=4.2, youtube_url="https://youtu.be/aeEmGvm7kDk?si=MVicK4VXc7LyxQ8y"),
    Piece(id=19, tier="Intermediate", title="The Entertainer", composer="Joplin",
          technicality=4.0, musicality=3.5, rhythmic_complexity=3.0,
          endurance=3.0, ornamentation=1.5, overall=3.3, youtube_url="https://youtu.be/TSoXBkF832I?si=wFEcLco2xMkUO2Le"),
    Piece(id=20, tier="Intermediate", title="Reverie", composer="Debussy",
          technicality=3.5, musicality=6.0, rhythmic_complexity=5.5,
          endurance=2.5, ornamentation=1.5, overall=4.2, youtube_url="https://youtu.be/_CUC2-S1NMI?si=tHwna30GWtUS4YKz"),
 
    # Late Inter / Early Adv
    Piece(id=21, tier="Late Inter / Early Adv", title="Serenade", composer="Schubert/Liszt",
          technicality=6.0, musicality=7.5, rhythmic_complexity=3.5,
          endurance=4.0, ornamentation=5.5, overall=5.7, youtube_url="https://youtu.be/lv5xPlm6etI?si=Qcgi9EVJ-hrXWk5C"),
    Piece(id=22, tier="Late Inter / Early Adv", title="Liebestraum No. 3", composer="Liszt",
          technicality=6.0, musicality=7.0, rhythmic_complexity=3.0,
          endurance=3.0, ornamentation=5.0, overall=5.3, youtube_url="https://youtu.be/MBOa-2b4uQQ?si=VRcXQU0DxbvAtC22"),
    Piece(id=23, tier="Late Inter / Early Adv", title="Fantaisie-Impromptu", composer="Chopin",
          technicality=7.0, musicality=5.5, rhythmic_complexity=5.5,
          endurance=4.5, ornamentation=3.0, overall=5.6, youtube_url="https://youtu.be/Gus4dnQuiGk?si=6WcYE2Xh6JX6LE-h"),
    Piece(id=24, tier="Late Inter / Early Adv", title="Piano Sonata No. 14, 1st Mvt (Moonlight)", composer="Beethoven",
          technicality=4.0, musicality=9.0, rhythmic_complexity=2.5,
          endurance=4.0, ornamentation=1.0, overall=5.0, youtube_url="https://youtu.be/sbTVZMJ9Z2I?si=DNpKWVfpRfqktHTh"),
    Piece(id=25, tier="Late Inter / Early Adv", title="Étude Op. 25 No. 2 in F minor (The Bees)", composer="Chopin",
          technicality=6.0, musicality=6.0, rhythmic_complexity=4.5,
          endurance=4.5, ornamentation=1.0, overall=5.1, youtube_url="https://youtu.be/wOZFXJ3AIQQ?si=yIncACt6RovTlhWa"),
    Piece(id=26, tier="Late Inter / Early Adv", title="Pathétique Sonata, 1st Mvt", composer="Beethoven",
          technicality=6.0, musicality=8.0, rhythmic_complexity=3.5,
          endurance=6.0, ornamentation=2.5, overall=5.9, youtube_url="https://youtu.be/WG6bC0-sr3o?si=l9CmQG66DoKmEOfY"),
    Piece(id=27, tier="Late Inter / Early Adv", title="Pathétique Sonata, 2nd Mvt", composer="Beethoven",
          technicality=4.0, musicality=7.0, rhythmic_complexity=3.0,
          endurance=3.0, ornamentation=2.5, overall=4.5, youtube_url="https://youtu.be/0njpfL1tXEg?si=dVlPZTk2rFdx_GA4"),
    Piece(id=28, tier="Late Inter / Early Adv", title="Pathétique Sonata, 3rd Mvt", composer="Beethoven",
          technicality=5.0, musicality=7.0, rhythmic_complexity=4.0,
          endurance=3.0, ornamentation=4.0, overall=5.1, youtube_url="https://youtu.be/L1-kZWjZP-g?si=pDfgoN8ap0y3jGny"),
    Piece(id=29, tier="Late Inter / Early Adv", title="Maple Leaf Rag", composer="Joplin",
          technicality=5.5, musicality=5.0, rhythmic_complexity=5.5,
          endurance=3.5, ornamentation=2.0, overall=4.7, youtube_url="https://youtu.be/rBInnwV21DM?si=5d1enMp5UcFbE9Tq"),
    Piece(id=30, tier="Late Inter / Early Adv", title="Sonata No. 17 (Tempest), 3rd Mvt", composer="Beethoven",
          technicality=5.5, musicality=6.0, rhythmic_complexity=5.0,
          endurance=4.5, ornamentation=2.0, overall=5.1, youtube_url="https://youtu.be/hKkR4YFtyJk?si=N6trl8Nq9pVc1s82"),
    Piece(id=31, tier="Late Inter / Early Adv", title="Prelude Op. 28 No. 16 in B♭ minor", composer="Chopin",
          technicality=7.0, musicality=5.5, rhythmic_complexity=6.0,
          endurance=4.0, ornamentation=2.0, overall=5.5, youtube_url="https://youtu.be/xGY0eRpV9Qw?si=tXd8eh9c3rEfmoQ2"),
 
    # Advanced
    Piece(id=32, tier="Advanced", title="Prelude in C# minor, Op. 3 No. 2", composer="Rachmaninoff",
          technicality=6.5, musicality=7.5, rhythmic_complexity=3.5,
          endurance=5.5, ornamentation=2.5, overall=5.8, youtube_url="https://youtu.be/sCtixpIWBto?si=dp28fiTvosoSd2IO"),
    Piece(id=33, tier="Advanced", title="Hungarian Dance No. 5", composer="Brahms",
          technicality=7.5, musicality=6.0, rhythmic_complexity=4.5,
          endurance=6.5, ornamentation=2.0, overall=5.9, youtube_url="https://youtu.be/HCDygl0pttM?si=eJR_vksH50HlEIkJ"),
    Piece(id=34, tier="Advanced", title="Prelude in G minor, Op. 23 No. 5", composer="Rachmaninoff",
          technicality=7.5, musicality=7.5, rhythmic_complexity=5.0,
          endurance=8.0, ornamentation=1.0, overall=6.6, youtube_url="https://youtu.be/SlcQWUn5DeI?si=2MPBKUz1Cx2s6sv4"),
    Piece(id=35, tier="Advanced", title="Étude Op. 25 No. 5 (Wrong Note)", composer="Chopin",
          technicality=7.0, musicality=8.0, rhythmic_complexity=5.0,
          endurance=4.0, ornamentation=3.0, overall=6.2, youtube_url="https://youtu.be/g7C2it9cCsY?si=2StP0C43jRg7vEMX"),
    Piece(id=36, tier="Advanced", title="Étude Op. 10 No. 12 (Revolutionary)", composer="Chopin",
          technicality=8.0, musicality=7.5, rhythmic_complexity=6.0,
          endurance=7.0, ornamentation=2.0, overall=6.8, youtube_url="https://youtu.be/g1uLrHq9TDg?si=OSagZtsJMwSiHJmk"),
    Piece(id=37, tier="Advanced", title="Piano Sonata No. 14, 3rd Mvt (Moonlight)", composer="Beethoven",
          technicality=8.0, musicality=8.0, rhythmic_complexity=4.5,
          endurance=7.0, ornamentation=3.5, overall=6.9, youtube_url="https://youtu.be/BV7RkEL6oRc?si=lJRuFG1VlTcFW8Zc"),
    Piece(id=38, tier="Advanced", title="Erlkönig, S. 558 No. 4", composer="Schubert/Liszt",
          technicality=8.0, musicality=9.0, rhythmic_complexity=4.0,
          endurance=10.0, ornamentation=3.5, overall=7.6, youtube_url="https://youtu.be/4_BmRekeJ8A?si=PA3ctlmI-xGrjJKl"),
    Piece(id=39, tier="Advanced", title="Scherzo No. 1 in B minor, Op. 20", composer="Chopin",
          technicality=8.0, musicality=8.0, rhythmic_complexity=5.0,
          endurance=6.5, ornamentation=2.0, overall=6.7, youtube_url="https://youtu.be/plHLfQ_QxKk?si=YlLF-bzlXgszAMY7"),
    Piece(id=40, tier="Advanced", title="Étude Op. 10 No. 5 (Black Keys)", composer="Chopin",
          technicality=7.5, musicality=7.5, rhythmic_complexity=4.5,
          endurance=6.0, ornamentation=2.5, overall=6.3, youtube_url="https://youtu.be/8tcnuRsfgUQ?si=PGpuO-Eip8HC9TYO"),
    Piece(id=41, tier="Advanced", title="Étude Op. 25 No. 12 (Ocean)", composer="Chopin",
          technicality=7.5, musicality=6.0, rhythmic_complexity=5.0,
          endurance=7.5, ornamentation=2.0, overall=6.1, youtube_url="https://youtu.be/pRlHKQXjzZY?si=1uv0NpaJnAQzF9_E"),
    Piece(id=42, tier="Advanced", title="Un Sospiro", composer="Liszt",
          technicality=7.5, musicality=8.0, rhythmic_complexity=7.0,
          endurance=6.0, ornamentation=5.5, overall=7.2, youtube_url="https://youtu.be/L42sbnQxEmw?si=ZXheE8Jxh8MOJSuo"),
    Piece(id=43, tier="Advanced", title="Liebesleid (Love's Sorrow)", composer="Kreisler/Rachmaninoff",
          technicality=7.5, musicality=8.5, rhythmic_complexity=7.0,
          endurance=5.5, ornamentation=4.5, overall=7.1, youtube_url="https://youtu.be/ZFvx32SjAtE?si=m12KHcthgsnSousk"),
    Piece(id=44, tier="Advanced", title="Étude Op. 10 No. 1 (Waterfall)", composer="Chopin",
          technicality=7.0, musicality=6.0, rhythmic_complexity=6.0,
          endurance=7.0, ornamentation=1.0, overall=6.0, youtube_url="https://youtu.be/JRgQgr4-at8?si=1FCxKV-nv6odlRZa"),
    Piece(id=45, tier="Advanced", title="In the Hall of the Mountain King", composer="Grieg/Ginzburg",
          technicality=7.5, musicality=7.5, rhythmic_complexity=6.0,
          endurance=8.0, ornamentation=4.0, overall=7.0, youtube_url="https://youtu.be/gSY-wD4l5DM?si=jyaftUshqInSRRbe"),
    Piece(id=46, tier="Advanced", title="Flight of the Bumblebee", composer="Rimsky-Korsakov",
          technicality=7.0, musicality=6.0, rhythmic_complexity=6.0,
          endurance=5.0, ornamentation=2.0, overall=5.8, youtube_url="https://youtu.be/M93qXQWaBdE?si=hYahH6HHMdV7Cg3x"),
    Piece(id=47, tier="Advanced", title="Étude Op. 25 No. 9 (Butterfly)", composer="Chopin",
          technicality=6.5, musicality=6.0, rhythmic_complexity=5.0,
          endurance=4.0, ornamentation=2.0, overall=5.3, youtube_url="https://youtu.be/WZYHvEF84NQ?si=JFFD0ylWCqcey2dj"),
 
    # Virtuoso
    Piece(id=48, tier="Virtuoso", title="Ballade No. 1 in G minor, Op. 23", composer="Chopin",
          technicality=8.5, musicality=9.0, rhythmic_complexity=5.5,
          endurance=8.5, ornamentation=4.0, overall=7.8, youtube_url="https://youtu.be/Zj_psrTUW_w?si=YCYbvI51mrXQTKDC"),
    Piece(id=49, tier="Virtuoso", title="Hungarian Rhapsody No. 2 in C# minor", composer="Liszt",
          technicality=9.5, musicality=8.5, rhythmic_complexity=5.0,
          endurance=9.0, ornamentation=9.0, overall=8.4, youtube_url="https://youtu.be/ALqOKq0M6ho?si=k_smSy2m2DqqvjZN"),
    Piece(id=50, tier="Virtuoso", title="Étude Op. 25 No. 11 (Winter Wind)", composer="Chopin",
          technicality=8.5, musicality=8.0, rhythmic_complexity=5.0,
          endurance=8.0, ornamentation=2.0, overall=7.1, youtube_url="https://youtu.be/gZjdAWgjLx8?si=U-aSNpwqBPdhqAko"),
    Piece(id=51, tier="Virtuoso", title="Étude Op. 10 No. 4 (Torrent)", composer="Chopin",
          technicality=9.0, musicality=7.5, rhythmic_complexity=6.0,
          endurance=8.0, ornamentation=2.0, overall=7.3, youtube_url="https://youtu.be/oHiU-u2ddJ4?si=R2LJdH0o1TrtdQ8i"),
    Piece(id=52, tier="Virtuoso", title="La Campanella", composer="Liszt",
          technicality=9.0, musicality=7.0, rhythmic_complexity=5.5,
          endurance=7.5, ornamentation=7.0, overall=7.5, youtube_url="https://youtu.be/Hf2MFBz4S_g?si=JXZsPdgx0rPIZu_F"),
    Piece(id=53, tier="Virtuoso", title="Hammerklavier Sonata, Op. 106", composer="Beethoven",
          technicality=10.0, musicality=10.0, rhythmic_complexity=8.0,
          endurance=10.0, ornamentation=4.0, overall=9.1, youtube_url="https://youtu.be/x_7HaIJSjY8?si=4-7F1tdBJMX-fve5"),
    Piece(id=54, tier="Virtuoso", title="Réminiscences de Don Juan", composer="Liszt",
          technicality=10.0, musicality=10.0, rhythmic_complexity=9.0,
          endurance=9.5, ornamentation=8.5, overall=9.6, youtube_url="https://youtu.be/JI6JfJXcUjU?si=4AkqinurGIcCsT5G"),
    Piece(id=55, tier="Virtuoso", title="Gaspard de la nuit (Ondine - Le Gibet - Scarbo)", composer="Ravel",
          technicality=10.0, musicality=10.0, rhythmic_complexity=9.5,
          endurance=9.0, ornamentation=5.5, overall=9.3, youtube_url="https://youtu.be/hKgcHjq1xKQ?si=a8z9VVHOZpSQB1yL"),
    Piece(id=56, tier="Virtuoso", title="Islamey", composer="Balakirev",
          technicality=10.0, musicality=9.0, rhythmic_complexity=9.5,
          endurance=9.5, ornamentation=7.5, overall=9.3, youtube_url="https://youtu.be/YXPeZUZkRuc?si=UF5rgWyXAIFkh7cg"),
    Piece(id=57, tier="Virtuoso", title="Danse Macabre, Op. 40", composer="Saint-Saëns/Liszt",
          technicality=8.5, musicality=7.0, rhythmic_complexity=7.0,
          endurance=8.0, ornamentation=8.0, overall=7.7, youtube_url="https://youtu.be/VbmT-I35k10?si=5m6emoiWlg-VobnP"),
    Piece(id=58, tier="Virtuoso", title="Passacaglia in B Minor", composer="Godowsky",
          technicality=9.0, musicality=9.0, rhythmic_complexity=8.0,
          endurance=8.5, ornamentation=5.0, overall=8.4, youtube_url="https://youtu.be/f0nlJXooIVc?si=tq5pMa8mRqH0UpSF"),
    Piece(id=59, tier="Virtuoso", title="Galop in A Minor, S. 218", composer="Liszt",
          technicality=8.5, musicality=7.0, rhythmic_complexity=8.5,
          endurance=8.5, ornamentation=7.5, overall=8.0, youtube_url="https://youtu.be/smobyeL5p_4?si=0jHckFr_lN76DFEQ"),
    Piece(id=60, tier="Virtuoso", title="Étude No. 6", composer="Paganini/Liszt",
          technicality=8.0, musicality=7.5, rhythmic_complexity=6.5,
          endurance=5.5, ornamentation=7.5, overall=7.2, youtube_url="https://youtu.be/LR98AEAgnYQ?si=XZb-2zYJiFl-TF6S"),
]


@app.get("/pieces")
def list_pieces(tier: str = None, sort: SortField = None):
    result = pieces

    if tier is not None:
        result = [p for p in result if p.tier == tier]
    
    if sort is not None:
        result = sorted(result, key=lambda p: getattr(p, sort.value))

    return result


@app.get("/pieces/search")
def search_pieces(q: str):
    result = []
    q_lower = q.lower().strip()
    for piece in pieces:
        if q_lower in piece.title.lower() or q_lower in piece.composer.lower():
            result.append(piece)
    return result


@app.get("/pieces/multi")
def get_multiple_pieces(ids: str):
    
    id_list = [int(x) for x in ids.split(",")]
    result = []
    for piece in pieces:
        if piece.id in id_list:
            result.append(piece)
    return result
    

@app.get("/pieces/{piece_id}")
def get_piece(piece_id: int):
    for piece in pieces:
        if piece.id == piece_id:
            return piece
    raise HTTPException(status_code=404, detail="Piece not found")


@app.get("/compare")
def compare_pieces(piece1_id: int, piece2_id: int):
    piece1 = None
    piece2 = None

    for piece in pieces:
        if piece.id == piece1_id:
            piece1 = piece
        
        if piece.id == piece2_id:
            piece2 = piece

    if piece1 is None or piece2 is None:
        raise HTTPException(status_code=404, detail="One or both pieces not found")
    
    return {"piece1": piece1, "piece2": piece2}


@app.get("/tiers")
def get_pieces_by_tier():
    result = {"Beginner": [], 
              "Late Beg / Early Inter": [], 
              "Intermediate": [], 
              "Late Inter / Early Adv": [], 
              "Advanced": [], 
              "Virtuoso": []
    }

    for piece in pieces:
        result[piece.tier].append(piece)
    return result


@app.get("/next-pair")
def next_pair(type: str, db: Session = Depends(get_db), session_id: str | None = Cookie(default=None)):
    ratings = db.query(Rating).filter(Rating.vote_type == type).all()
    if not ratings:
        raise HTTPException(status_code=400, detail="Invalid vote type")

    cutoff = datetime.now(timezone.utc) - timedelta(hours=24)
    recent = db.query(Vote).filter(
        Vote.session_id == session_id,
        Vote.vote_type == type,
        Vote.timestamp >= cutoff,
    ).all() if session_id else []
    voted_pairs = {frozenset({v.winner_piece_id, v.loser_piece_id}) for v in recent}

    for _ in range(10):
        anchor = random.choice(ratings)
        closest = db.query(Rating).filter(
            Rating.vote_type == type,
            Rating.id != anchor.id,
        ).order_by(func.abs(Rating.elo - anchor.elo)).limit(5).all()

        options = [c for c in closest if frozenset({anchor.piece_id, c.piece_id}) not in voted_pairs]
        if options:
            opponent = random.choice(options)
            piece1 = next(p for p in pieces if p.id == anchor.piece_id)
            piece2 = next(p for p in pieces if p.id == opponent.piece_id)
            return {"piece1": piece1, "piece2": piece2}

    anchor = random.choice(ratings)
    closest = db.query(Rating).filter(Rating.vote_type == type, Rating.id != anchor.id).order_by(func.abs(Rating.elo - anchor.elo)).limit(5).all()
    opponent = random.choice(closest)
    piece1 = next(p for p in pieces if p.id == anchor.piece_id)
    piece2 = next(p for p in pieces if p.id == opponent.piece_id)
    return {"piece1": piece1, "piece2": piece2}


@app.post("/vote")
def cast_vote(
    vote: VoteRequest,
    response: Response,
    db: Session = Depends(get_db),
    session_id: str | None = Cookie(default=None)
):
    
    if session_id is None:
        session_id = str(uuid.uuid4())
        is_prod = os.environ.get("ENV") == "production"
        response.set_cookie(
            key="session_id",
            value=session_id,
            httponly=True,
            max_age=60 * 60 * 24 * 365,
            samesite="none" if is_prod else "lax",
            secure=is_prod,
        )

    a, b = vote.winner_piece_id, vote.loser_piece_id
    cutoff = datetime.now(timezone.utc) - timedelta(hours=24)
    already_voted = db.query(Vote).filter(
        Vote.session_id == session_id,
        Vote.vote_type == vote.vote_type,
        Vote.timestamp >= cutoff,
        or_(and_(Vote.winner_piece_id == a, Vote.loser_piece_id == b),
            and_(Vote.winner_piece_id == b, Vote.loser_piece_id == a))).first()

    if already_voted is not None:
        raise HTTPException(status_code=429, detail="Already voted on this pairing")

    winner = db.query(Rating).filter(
            Rating.piece_id == vote.winner_piece_id,
            Rating.vote_type == vote.vote_type).first()

    loser = db.query(Rating).filter(
            Rating.piece_id == vote.loser_piece_id,
            Rating.vote_type == vote.vote_type).first()
            
    if winner is None or loser is None:
        raise HTTPException(status_code=404, detail="One or both pieces not found")

    winner_before = winner.elo
    loser_before = loser.elo

    k = 32
    expected_winner = 1 / (1 + 10 ** ((loser.elo - winner.elo) / 400))
    expected_loser = 1 - expected_winner
    winner.elo = winner.elo + k*(1 - expected_winner)
    loser.elo = loser.elo + k*(0 - expected_loser)

    winner.win_count += 1
    loser.loss_count += 1

    db.add(Vote(
    winner_piece_id=vote.winner_piece_id,
    loser_piece_id=vote.loser_piece_id,
    vote_type=vote.vote_type,
    session_id=session_id))

    db.commit()
    db.refresh(winner)
    db.refresh(loser)

    return {
        "winner": winner,
        "loser": loser,
        "winner_delta": winner.elo - winner_before,
        "loser_delta": loser.elo - loser_before,
    }
    

@app.get("/leaderboard")
def leaderboard(type: str, db: Session = Depends(get_db)):
    ranking = db.query(Rating).filter(Rating.vote_type == type).order_by(Rating.elo.desc()).all()
    return ranking
