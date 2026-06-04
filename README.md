# Rankey

Rankey is a a weighted comparison tool for classical piano repertoire, ranking pieces 
across five dimensions of difficulty.

🎹 **Live soon:** [rankey.app](https://rankey.app)

## About

Rankey scores each piece across five weighted dimensions (Technicality 30%, Musicality 30%, Rhythmic Complexity 15%, 
Endurance 15%, Ornamentation 10%). This helps to produce a consistent overall ranking for head-to-head comparisons.

## Features

- Browse iconic classical pieces ranging in difficulty
- Live search across titles and composers (accent + period insensitive)
- Filter by difficulty tier (Beginner → Virtuoso)
- Click any piece for a detailed score breakdown
- Compare up to 6 pieces side-by-side
- Embedded YouTube search for every piece

## Tech Stack

**Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS v4, Framer Motion  
**Backend:** FastAPI, Pydantic  
**Deployment:** Vercel (frontend), Railway (backend)

## Local Development

### Backend

\`\`\`bash
cd backend
python -m venv venv
source venv/bin/activate  # on windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
\`\`\`

Runs on http://localhost:8000.

### Frontend

\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

Runs on http://localhost:3000.

## Project Structure

\`\`\`
piano-difficulty-ranker/
├── backend/         # FastAPI + Pydantic, 40 hardcoded pieces
└── frontend/        # Next.js App Router, Tailwind v4
\`\`\`

## Author

Built by [Ethan Yeung](https://github.com/ethan-yeung) — UBC Sauder BCom + CS

---