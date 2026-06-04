import { Piece, Rating, VoteType, VoteResult } from "./types";


const API = process.env.NEXT_PUBLIC_API_URL;


export async function castVote(winnerId: number, loserId: number, type: VoteType): Promise<VoteResult> {
    const res = await fetch(`${API}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ winner_piece_id: winnerId, loser_piece_id: loserId, vote_type: type }),
    });
    if (!res.ok) throw new Error(`Vote failed: ${res.status}`);
    return res.json();
}


export async function getNextPair(type: VoteType): Promise<{ piece1: Piece; piece2: Piece }> {
    const res = await fetch(`${API}/next-pair?type=${type}`, {
        credentials: "include",
    });
    return res.json();
}


export async function getLeaderboard(type: VoteType): Promise<Rating[]> {
    const res = await fetch(`${API}/leaderboard?type=${type}`, {
        credentials: "include",
    });
    return res.json();
}