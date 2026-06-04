"use client";
import { useState, useEffect } from "react";
import { Piece, VoteType, VoteResult } from "../lib/types";
import { getNextPair, castVote } from "../lib/api";
import { Play } from "lucide-react";
import DifficultyStars from "./DifficultyStars";
import AnimatedNumber from "./AnimatedNumber";
import { motion } from "framer-motion";
import FlipCard from "./FlipCard";

export default function VotingSection() {

    const [pair, setPair] = useState<{ piece1: Piece; piece2: Piece } | null>(null);
    const [result, setResult] = useState<VoteResult | null>(null);
    const [voteType, setVoteType] = useState<VoteType>("player");

    async function loadPair() {
        const data = await getNextPair(voteType);
        setPair(data);
    }

    useEffect(() => {
        loadPair();
    }, []);


    async function handleVote(winnerId: number, loserId: number) {
        try {
            const res = await castVote(winnerId, loserId, voteType);
            setResult(res);
        } catch {
            await loadPair();
        }
    }

    async function handleNext() {
        setResult(null);
        await loadPair();

    }



    return (
        <section id="vote" className="min-h-[calc(100vh-73px)] scroll-mt-[73px] flex flex-col justify-center px-4 md:px-8 py-16 md:py-24">
            <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
                <h2 className="font-display text-piano-cream text-4xl md:text-6xl mb-6">Make Your Choice</h2>
                <p className="text-piano-muted text-base md:text-lg mb-4">
                    {voteType === "player"
                        ? <>Which is harder to <span className="text-piano-gold">play</span>?</>
                        : <>Which <span className="text-piano-gold">sounds</span> harder?</>}
                </p>
                <div className="inline-flex items-center gap-2 bg-piano-bg border border-piano-border rounded-full p-1">
                    {(["player", "listener"] as VoteType[]).map(t => (
                        <button key={t} type="button" onClick={() => { setVoteType(t); setResult(null); }}
                            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide transition cursor-pointer ${voteType === t ? "bg-piano-gold text-piano-bg" : "text-piano-muted hover:text-piano-cream"}`}>
                            {t === "player" ? "As a Player" : "As a Listener"}
                        </button>
                    ))}
                </div>
            </div>

            {!pair ? (
                <p className="text-piano-muted text-center">Loading…</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto w-full">
                        {[pair.piece1, pair.piece2].map((piece, i) => {
                            const opponent = i === 0 ? pair.piece2 : pair.piece1;
                            const won = result ? result.winner.piece_id === piece.id : false;
                            const rating = result ? (won ? result.winner : result.loser) : null;
                            const delta = result ? (won ? result.winner_delta : result.loser_delta) : 0;
                            return (
                                <FlipCard
                                    key={i}
                                    piece={piece}
                                    flipped={result !== null}
                                    won={won}
                                    rating={rating}
                                    delta={delta}
                                    onVote={() => handleVote(piece.id, opponent.id)}
                                />
                            );
                        })}
                    </div>

                    <div className="text-center mt-10 min-h-[3rem]">
                        {result ? (
                            <button onClick={handleNext} className="bg-piano-gold text-piano-bg font-bold text-sm uppercase tracking-wide rounded-lg px-8 py-2.5 cursor-pointer hover:opacity-90 transition">
                                Next
                            </button>
                        ) : (
                            <button onClick={() => loadPair()} className="text-piano-muted hover:text-piano-cream font-bold text-sm uppercase tracking-wide px-8 py-2.5 cursor-pointer transition">
                                Skip
                            </button>
                        )}
                    </div>
                </>
            )}
        </section >
    );
}