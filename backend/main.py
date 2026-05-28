from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from enum import Enum

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
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

pieces = [
    # Beginner
    Piece(id=1, tier="Beginner", title="Minuet in G Major", composer="Bach",
          technicality=1.0, musicality=3.0, rhythmic_complexity=0.5,
          endurance=1.5, ornamentation=2.0, overall=1.7),
    Piece(id=2, tier="Beginner", title="Sonatina in C Major, Op. 36 No. 1", composer="Clementi",
          technicality=2.0, musicality=3.5, rhythmic_complexity=1.5,
          endurance=1.5, ornamentation=0.5, overall=2.2),
    Piece(id=3, tier="Beginner", title="Arabesque, Op. 100 No. 2", composer="Burgmüller",
          technicality=1.5, musicality=2.5, rhythmic_complexity=2.0,
          endurance=1.0, ornamentation=0.5, overall=1.7),
 
    # Late Beg / Early Inter
    Piece(id=4, tier="Late Beg / Early Inter", title="Prelude in A Major, Op. 28 No. 7", composer="Chopin",
          technicality=2.0, musicality=3.5, rhythmic_complexity=1.5,
          endurance=1.5, ornamentation=0.0, overall=2.1),
    Piece(id=5, tier="Late Beg / Early Inter", title="Prelude in C Major (WTC Book 1)", composer="Bach",
          technicality=2.0, musicality=4.0, rhythmic_complexity=1.5,
          endurance=2.0, ornamentation=0.0, overall=2.3),
    Piece(id=6, tier="Late Beg / Early Inter", title="Gymnopédie No. 1", composer="Satie",
          technicality=1.5, musicality=3.5, rhythmic_complexity=2.0,
          endurance=2.5, ornamentation=0.0, overall=2.2),
    Piece(id=7, tier="Late Beg / Early Inter", title="Sonata No. 16, K. 545, 1st Movement", composer="Mozart",
          technicality=2.0, musicality=7.0, rhythmic_complexity=2.5,
          endurance=2.0, ornamentation=2.0, overall=3.6),
    Piece(id=8, tier="Late Beg / Early Inter", title="Solfeggietto", composer="C.P.E. Bach",
          technicality=3.0, musicality=3.0, rhythmic_complexity=2.0,
          endurance=2.0, ornamentation=0.0, overall=2.4),
    Piece(id=9, tier="Late Beg / Early Inter", title="Waltz in A Minor, B. 150 (Op. Posth.)", composer="Chopin",
          technicality=2.5, musicality=4.5, rhythmic_complexity=2.5,
          endurance=2.0, ornamentation=2.5, overall=3.0),
    Piece(id=10, tier="Late Beg / Early Inter", title="Passacaglia", composer="Handel/Halvorsen",
          technicality=3.5, musicality=5.0, rhythmic_complexity=2.0,
          endurance=2.0, ornamentation=0.0, overall=3.2),
    Piece(id=11, tier="Late Beg / Early Inter", title="Canon in D", composer="Pachelbel",
          technicality=2.5, musicality=4.5, rhythmic_complexity=2.5,
          endurance=2.0, ornamentation=0.0, overall=2.8),
 
    # Intermediate
    Piece(id=12, tier="Intermediate", title="Für Elise", composer="Beethoven",
          technicality=3.5, musicality=4.0, rhythmic_complexity=2.0,
          endurance=3.0, ornamentation=1.0, overall=3.1),
    Piece(id=13, tier="Intermediate", title="Arabesque No. 1", composer="Debussy",
          technicality=3.5, musicality=5.0, rhythmic_complexity=3.5,
          endurance=3.0, ornamentation=0.5, overall=3.6),
    Piece(id=14, tier="Intermediate", title="Nocturne in C# minor, No. 20", composer="Chopin",
          technicality=3.5, musicality=7.0, rhythmic_complexity=3.0,
          endurance=2.5, ornamentation=2.5, overall=4.2),
    Piece(id=15, tier="Intermediate", title="Clair de Lune", composer="Debussy",
          technicality=4.0, musicality=7.0, rhythmic_complexity=4.0,
          endurance=3.5, ornamentation=1.0, overall=4.5),
    Piece(id=16, tier="Intermediate", title="Nocturne Op. 9 No. 2 in E♭ major", composer="Chopin",
          technicality=4.0, musicality=7.0, rhythmic_complexity=3.0,
          endurance=3.0, ornamentation=5.0, overall=4.7),
    Piece(id=17, tier="Intermediate", title="Prelude in E minor, Op. 28 No. 4", composer="Chopin",
          technicality=2.0, musicality=5.0, rhythmic_complexity=2.5,
          endurance=1.5, ornamentation=1.0, overall=2.8),
    Piece(id=18, tier="Intermediate", title="Rondo alla Turca (K. 331, 3rd Mvt)", composer="Mozart",
          technicality=4.5, musicality=5.5, rhythmic_complexity=3.0,
          endurance=3.0, ornamentation=3.0, overall=4.2),
    Piece(id=19, tier="Intermediate", title="The Entertainer", composer="Joplin",
          technicality=4.0, musicality=3.5, rhythmic_complexity=3.0,
          endurance=3.0, ornamentation=1.5, overall=3.3),
    Piece(id=20, tier="Intermediate", title="Reverie", composer="Debussy",
          technicality=3.5, musicality=6.0, rhythmic_complexity=5.5,
          endurance=2.5, ornamentation=1.5, overall=4.2),
 
    # Late Inter / Early Adv
    Piece(id=21, tier="Late Inter / Early Adv", title="Serenade", composer="Schubert/Liszt",
          technicality=6.0, musicality=7.5, rhythmic_complexity=3.5,
          endurance=4.0, ornamentation=5.5, overall=5.7),
    Piece(id=22, tier="Late Inter / Early Adv", title="Liebestraum No. 3", composer="Liszt",
          technicality=6.0, musicality=7.0, rhythmic_complexity=3.0,
          endurance=3.0, ornamentation=5.0, overall=5.3),
    Piece(id=23, tier="Late Inter / Early Adv", title="Fantaisie-Impromptu", composer="Chopin",
          technicality=7.0, musicality=5.5, rhythmic_complexity=5.5,
          endurance=4.5, ornamentation=3.0, overall=5.6),
    Piece(id=24, tier="Late Inter / Early Adv", title="Piano Sonata No. 14, 1st Mvt (Moonlight)", composer="Beethoven",
          technicality=4.0, musicality=9.0, rhythmic_complexity=2.5,
          endurance=4.0, ornamentation=1.0, overall=5.0),
    Piece(id=25, tier="Late Inter / Early Adv", title="Étude Op. 25 No. 2 in F minor (The Bees)", composer="Chopin",
          technicality=6.0, musicality=6.0, rhythmic_complexity=4.5,
          endurance=4.5, ornamentation=1.0, overall=5.1),
    Piece(id=26, tier="Late Inter / Early Adv", title="Pathétique Sonata, 1st Mvt", composer="Beethoven",
          technicality=6.0, musicality=8.0, rhythmic_complexity=3.5,
          endurance=6.0, ornamentation=2.5, overall=5.9),
    Piece(id=27, tier="Late Inter / Early Adv", title="Pathétique Sonata, 2nd Mvt", composer="Beethoven",
          technicality=4.0, musicality=7.0, rhythmic_complexity=3.0,
          endurance=3.0, ornamentation=2.5, overall=4.5),
    Piece(id=28, tier="Late Inter / Early Adv", title="Pathétique Sonata, 3rd Mvt", composer="Beethoven",
          technicality=5.0, musicality=7.0, rhythmic_complexity=4.0,
          endurance=3.0, ornamentation=4.0, overall=5.1),
    Piece(id=29, tier="Late Inter / Early Adv", title="Maple Leaf Rag", composer="Joplin",
          technicality=5.5, musicality=5.0, rhythmic_complexity=5.5,
          endurance=3.5, ornamentation=2.0, overall=4.7),
    Piece(id=30, tier="Late Inter / Early Adv", title="Sonata No. 17 (Tempest), 3rd Mvt", composer="Beethoven",
          technicality=5.5, musicality=6.0, rhythmic_complexity=5.0,
          endurance=4.5, ornamentation=2.0, overall=5.1),
    Piece(id=31, tier="Late Inter / Early Adv", title="Prelude Op. 28 No. 16 in B♭ minor", composer="Chopin",
          technicality=6.0, musicality=5.5, rhythmic_complexity=4.5,
          endurance=4.0, ornamentation=2.0, overall=4.9),
 
    # Advanced
    Piece(id=32, tier="Advanced", title="Prelude in C# minor, Op. 3 No. 2", composer="Rachmaninoff",
          technicality=6.5, musicality=7.5, rhythmic_complexity=3.5,
          endurance=5.5, ornamentation=2.5, overall=5.8),
    Piece(id=33, tier="Advanced", title="Hungarian Dance No. 5", composer="Brahms",
          technicality=7.5, musicality=6.0, rhythmic_complexity=4.5,
          endurance=6.5, ornamentation=2.0, overall=5.9),
    Piece(id=34, tier="Advanced", title="Prelude in G minor, Op. 23 No. 5", composer="Rachmaninoff",
          technicality=7.5, musicality=7.5, rhythmic_complexity=5.0,
          endurance=8.0, ornamentation=1.0, overall=6.6),
    Piece(id=35, tier="Advanced", title="Étude Op. 25 No. 5 (Wrong Note)", composer="Chopin",
          technicality=7.0, musicality=8.0, rhythmic_complexity=5.0,
          endurance=4.0, ornamentation=3.0, overall=6.2),
    Piece(id=36, tier="Advanced", title="Étude Op. 10 No. 12 (Revolutionary)", composer="Chopin",
          technicality=8.0, musicality=7.5, rhythmic_complexity=6.0,
          endurance=7.0, ornamentation=2.0, overall=6.8),
    Piece(id=37, tier="Advanced", title="Piano Sonata No. 14, 3rd Mvt (Moonlight)", composer="Beethoven",
          technicality=8.0, musicality=8.0, rhythmic_complexity=4.5,
          endurance=7.0, ornamentation=3.5, overall=6.9),
    Piece(id=38, tier="Advanced", title="Erlkönig, S. 558 No. 4", composer="Schubert/Liszt",
          technicality=8.0, musicality=9.0, rhythmic_complexity=4.0,
          endurance=10.0, ornamentation=3.5, overall=7.6),
    Piece(id=39, tier="Advanced", title="Scherzo No. 1 in B minor, Op. 20", composer="Chopin",
          technicality=8.0, musicality=8.0, rhythmic_complexity=5.0,
          endurance=6.5, ornamentation=2.0, overall=6.7),
    Piece(id=40, tier="Advanced", title="Étude Op. 10 No. 5 (Black Keys)", composer="Chopin",
          technicality=7.5, musicality=7.5, rhythmic_complexity=4.5,
          endurance=6.0, ornamentation=2.5, overall=6.3),
    Piece(id=41, tier="Advanced", title="Étude Op. 25 No. 12 (Ocean)", composer="Chopin",
          technicality=8.0, musicality=6.0, rhythmic_complexity=5.0,
          endurance=7.5, ornamentation=2.0, overall=6.3),
    Piece(id=42, tier="Advanced", title="Un Sospiro", composer="Liszt",
          technicality=7.5, musicality=8.0, rhythmic_complexity=7.0,
          endurance=6.0, ornamentation=5.5, overall=7.2),
    Piece(id=43, tier="Advanced", title="Liebesleid (Love's Sorrow)", composer="Kreisler/Rachmaninoff",
          technicality=7.5, musicality=8.5, rhythmic_complexity=7.0,
          endurance=5.5, ornamentation=4.5, overall=7.1),
    Piece(id=44, tier="Advanced", title="Étude Op. 10 No. 1 (Waterfall)", composer="Chopin",
          technicality=8.0, musicality=6.5, rhythmic_complexity=7.0,
          endurance=8.0, ornamentation=1.0, overall=6.7),
    Piece(id=45, tier="Advanced", title="In the Hall of the Mountain King", composer="Grieg/Ginzburg",
          technicality=7.5, musicality=7.5, rhythmic_complexity=6.0,
          endurance=8.0, ornamentation=4.0, overall=7.0),
    Piece(id=46, tier="Advanced", title="Flight of the Bumblebee", composer="Rimsky-Korsakov",
          technicality=7.0, musicality=6.0, rhythmic_complexity=6.0,
          endurance=5.0, ornamentation=2.0, overall=5.8),
    Piece(id=47, tier="Advanced", title="Étude Op. 25 No. 9 (Butterfly)", composer="Chopin",
          technicality=6.5, musicality=6.0, rhythmic_complexity=5.0,
          endurance=4.0, ornamentation=2.0, overall=5.3),
 
    # Virtuoso
    Piece(id=48, tier="Virtuoso", title="Ballade No. 1 in G minor, Op. 23", composer="Chopin",
          technicality=8.5, musicality=9.0, rhythmic_complexity=5.5,
          endurance=8.5, ornamentation=4.0, overall=7.8),
    Piece(id=49, tier="Virtuoso", title="Hungarian Rhapsody No. 2 in C# minor", composer="Liszt",
          technicality=9.5, musicality=8.5, rhythmic_complexity=5.0,
          endurance=9.0, ornamentation=9.0, overall=8.4),
    Piece(id=50, tier="Virtuoso", title="Étude Op. 25 No. 11 (Winter Wind)", composer="Chopin",
          technicality=8.5, musicality=8.0, rhythmic_complexity=5.0,
          endurance=8.0, ornamentation=2.0, overall=7.1),
    Piece(id=51, tier="Virtuoso", title="Étude Op. 10 No. 4 (Torrent)", composer="Chopin",
          technicality=9.0, musicality=7.5, rhythmic_complexity=6.0,
          endurance=8.0, ornamentation=2.0, overall=7.3),
    Piece(id=52, tier="Virtuoso", title="La Campanella", composer="Liszt",
          technicality=9.0, musicality=7.0, rhythmic_complexity=5.5,
          endurance=7.5, ornamentation=7.0, overall=7.5),
    Piece(id=53, tier="Virtuoso", title="Hammerklavier Sonata, Op. 106", composer="Beethoven",
          technicality=10.0, musicality=10.0, rhythmic_complexity=8.0,
          endurance=10.0, ornamentation=4.0, overall=9.1),
    Piece(id=54, tier="Virtuoso", title="Réminiscences de Don Juan", composer="Liszt",
          technicality=10.0, musicality=10.0, rhythmic_complexity=9.0,
          endurance=9.5, ornamentation=8.5, overall=9.6),
    Piece(id=55, tier="Virtuoso", title="Gaspard de la nuit (Ondine - Le Gibet - Scarbo)", composer="Ravel",
          technicality=10.0, musicality=10.0, rhythmic_complexity=9.5,
          endurance=9.0, ornamentation=5.5, overall=9.3),
    Piece(id=56, tier="Virtuoso", title="Islamey", composer="Balakirev",
          technicality=10.0, musicality=9.0, rhythmic_complexity=9.5,
          endurance=9.5, ornamentation=7.5, overall=9.3),
    Piece(id=57, tier="Virtuoso", title="Danse Macabre, Op. 40", composer="Saint-Saëns/Liszt",
          technicality=8.5, musicality=7.0, rhythmic_complexity=7.0,
          endurance=8.0, ornamentation=8.0, overall=7.7),
    Piece(id=58, tier="Virtuoso", title="Passacaglia in B Minor", composer="Godowsky",
          technicality=9.0, musicality=9.0, rhythmic_complexity=8.0,
          endurance=8.5, ornamentation=5.0, overall=8.4),
    Piece(id=59, tier="Virtuoso", title="Gallop in A Minor, S. 218", composer="Liszt",
          technicality=8.5, musicality=7.0, rhythmic_complexity=8.5,
          endurance=8.5, ornamentation=7.5, overall=8.0),
    Piece(id=60, tier="Virtuoso", title="Étude No. 6", composer="Paganini/Liszt",
          technicality=8.0, musicality=7.5, rhythmic_complexity=6.5,
          endurance=5.5, ornamentation=7.5, overall=7.2),
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
        
