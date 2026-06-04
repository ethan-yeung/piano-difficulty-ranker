"use client";
import { useState, useEffect } from "react";
import { Piece, Rating, VoteType } from "../lib/types";
import { getLeaderboard } from "../lib/api";
import { motion, AnimatePresence } from "framer-motion";

type LeaderboardProps = { pieces: Piece[] };

export default function Leaderboard({ pieces }: LeaderboardProps) {
    const [ratings, setRatings] = useState<Rating[]>([]);
    const [type, setType] = useState<VoteType>("player");

    useEffect(() => {
        async function load() {
            const data = await getLeaderboard(type);
            setRatings(data);
        }
        load();
    }, [type]);

    const pieceById = new Map(pieces.map(p => [p.id, p]));

    return (
        <section id="leaderboard" className="px-4 md:px-8 py-16 md:py-24">
            <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
                <h2 className="font-display text-piano-cream text-4xl md:text-5xl mb-6">Leaderboard</h2>
                <div className="inline-flex items-center gap-2 bg-piano-bg border border-piano-border rounded-full p-1">
                    {(["player", "listener"] as VoteType[]).map(t => (
                        <button key={t} type="button" onClick={() => setType(t)}
                            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide transition cursor-pointer ${type === t ? "bg-piano-gold text-piano-bg" : "text-piano-muted hover:text-piano-cream"}`}>
                            {t === "player" ? "Players" : "Listeners"}
                        </button>
                    ))}
                </div>
            </div>
            <AnimatePresence mode="wait">
                <motion.div key={type} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="max-w-4xl mx-auto space-y-2">
                    {ratings.map((rating, i) => {
                        const piece = pieceById.get(rating.piece_id);
                        if (!piece) return null;
                        const rank = i + 1;
                        return (
                            <div key={rating.id} className="flex items-center gap-4 rounded-lg bg-piano-surface border border-piano-border px-4 md:px-6 py-3">
                                <span className={`font-display text-xl md:text-2xl w-8 text-center ${rank <= 3 ? "text-piano-gold" : "text-piano-muted"}`}>
                                    {rank}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <p className="font-display text-piano-cream text-base md:text-lg truncate">{piece.title}</p>
                                    <p className="text-piano-muted text-xs md:text-sm">{piece.composer} · {piece.tier}</p>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="font-display text-piano-gold text-2xl md:text-3xl leading-none">{Math.round(rating.elo)}</p>
                                </div>
                            </div>
                        );
                    })}
                </motion.div>
            </AnimatePresence>
        </section>
    );
}