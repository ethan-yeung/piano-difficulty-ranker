"use client";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import DifficultyStars from "./DifficultyStars";
import AnimatedNumber from "./AnimatedNumber";
import { Piece, Rating } from "../lib/types";

type FlipCardProps = {
    piece: Piece;
    flipped: boolean;
    won: boolean;
    rating: Rating | null;
    delta: number;
    onVote: () => void;
};

export default function FlipCard({ piece, flipped, won, rating, delta, onVote }: FlipCardProps) {
    const youtubeUrl = piece.youtube_url || `https://www.youtube.com/results?search_query=${encodeURIComponent(piece.title + " " + piece.composer)}`;

    return (
        <div className="[perspective:1000px] min-h-[15rem] md:min-h-[22rem]">
            <motion.div
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative w-full h-full min-h-[15rem] md:min-h-[22rem]"
            >
               
                <div
                    onClick={!flipped ? onVote : undefined}
                    style={{ backfaceVisibility: "hidden" }}
                    className="absolute inset-0 rounded-lg bg-piano-surface border border-piano-border p-6 md:p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-piano-gold hover:shadow-[0_0_24px_2px_rgba(212,167,68,0.35)] transition-[border-color,box-shadow] duration-300"
                >
                    <h3 className="font-display text-piano-cream text-xl md:text-3xl mb-2 min-h-[3.5rem] md:min-h-[4.5rem] flex items-center justify-center">
                        <span className="text-balance">{piece.title}</span>
                    </h3>
                    <p className="text-piano-muted text-sm md:text-base mb-8">{piece.composer}</p>
                    <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                        className="bg-piano-gold text-piano-bg font-bold text-xs uppercase tracking-wide rounded-lg px-3 py-2 inline-flex items-center gap-2 hover:opacity-90 transition cursor-pointer">
                        <Play className="w-3 h-3" fill="currentColor" />
                        Listen
                    </a>
                </div>

               
                <div
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                    className={`absolute inset-0 rounded-lg border p-6 md:p-10 flex flex-col items-center justify-center text-center ${won ? "bg-piano-surface border-piano-gold shadow-[0_0_24px_2px_rgba(212,167,68,0.35)]" : "bg-piano-surface border-piano-border opacity-50"}`}
                >
                    <h3 className="font-display text-piano-cream text-lg md:text-xl mb-0.5">{piece.title}</h3>
                    <p className="text-piano-muted text-xs mb-5">{piece.composer}</p>
                    <p className={`font-display text-5xl md:text-6xl leading-none ${won ? "text-piano-gold" : "text-piano-muted"}`}>
                        {rating && <AnimatedNumber from={Math.round(rating.elo - delta)} to={Math.round(rating.elo)} />}
                    </p>
                    <p className={`text-sm font-bold mt-3 ${won ? "text-piano-gold" : "text-piano-muted"}`}>
                        {delta > 0 ? "+" : ""}{Math.round(delta)} {won ? "↑" : "↓"}
                    </p>
                    <div className="mt-5 pt-4 border-t border-piano-border w-full">
                        <p className="text-piano-gold font-bold text-xs uppercase tracking-wide mb-2">{piece.tier}</p>
                        <div className="flex items-center justify-center gap-2">
                            <DifficultyStars score={piece.overall} />
                            <span className="text-piano-muted text-sm">{piece.overall}/10</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}