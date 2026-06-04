import { Piece } from "../lib/types";
import { X, Play } from "lucide-react";
import DifficultyStars from "./DifficultyStars";
import { Winners } from "../lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";

type CompareCardProps = {
    piece: Piece;
    onRemove: () => void;
    winners: Winners | null;
    viewMode: "stars" | "radar";
};


export default function CompareCard({ piece, onRemove, winners, viewMode }: CompareCardProps) {

    const DIMENSIONS = [
        { key: "technicality", label: "Technicality", value: piece.technicality },
        { key: "musicality", label: "Musicality", value: piece.musicality },
        { key: "rhythmic_complexity", label: "Rhythmic Comp.", value: piece.rhythmic_complexity },
        { key: "endurance", label: "Endurance", value: piece.endurance },
        { key: "ornamentation", label: "Ornamentation", value: piece.ornamentation },
    ];

    const data = [
        { dimension: "Tech", value: piece.technicality },
        { dimension: "Music", value: piece.musicality },
        { dimension: "Rhythm", value: piece.rhythmic_complexity },
        { dimension: "End", value: piece.endurance },
        { dimension: "Orn", value: piece.ornamentation },
    ];

    const isOverallWinner = winners !== null && piece.overall === winners.overall;
    const youtubeSearchUrl = piece.youtube_url || `https://www.youtube.com/results?search_query=${encodeURIComponent(piece.title + " " + piece.composer)}`;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
                duration: 0.25,
                ease: "easeInOut",
                boxShadow: {
                    duration: 2,
                    repeat: isOverallWinner ? Infinity : 0,
                    ease: "easeInOut"
                }
            }}
            className="relative rounded-lg bg-piano-surface border border-piano-border p-4 md:p-5"
        >
            <button
                type="button"
                onClick={onRemove}
                aria-label="Remove from comparison"
                className="absolute top-5 right-5 p-2 -m-2 text-piano-muted hover:text-piano-cream cursor-pointer transition"
            >
                <X className="w-5 h-5" />
            </button>

            <p className="text-piano-gold font-bold text-xs uppercase tracking-wide mb-1">
                {piece.tier}
            </p>

            <h3 className="font-display text-piano-cream text-xl mb-1 pr-6 text-balance">
                {piece.title}
            </h3>

            <p className="text-piano-muted text-sm mb-4">{piece.composer}</p>

            <div className="min-h-[140px]">
                <AnimatePresence mode="wait">
                    {viewMode === "stars" ? (
                        <motion.div
                            key="stars"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-2"
                        >
                            {DIMENSIONS.map(dim => (
                                <div
                                    key={dim.key}
                                    className={`flex items-center gap-3 px-2 py-1 rounded transition ${winners && dim.value === winners[dim.key as keyof Winners]
                                        ? "bg-piano-gold/20 border-l-2 border-piano-gold pl-1.5"
                                        : "pl-2"
                                        }`}
                                >
                                    <span className="text-piano-cream text-xs flex-1">{dim.label}</span>
                                    <DifficultyStars score={dim.value} />
                                    <span className="text-piano-muted text-xs w-8 text-right">
                                        {dim.value.toFixed(1)}
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="radar"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div tabIndex={-1} className="outline-none">
                                {<ResponsiveContainer width="100%" height={140}>
                                    <RadarChart data={data}>
                                        <PolarGrid stroke="#2A2A2A" />
                                        <PolarAngleAxis dataKey="dimension" tick={{ fill: "#A09988", fontSize: 11 }} />
                                        <PolarRadiusAxis domain={[0, 10]} tick={false} axisLine={false} />
                                        <Radar
                                            dataKey="value"
                                            stroke="#D4A744"
                                            fill="#D4A744"
                                            fillOpacity={0.3}
                                            dot={{ fill: "#D4A744", r: 3 }}
                                        />
                                        <Tooltip
                                            cursor={false}
                                            contentStyle={{
                                                backgroundColor: "#1A1A1A",
                                                border: "1px solid #2A2A2A",
                                                borderRadius: "8px",
                                                color: "#F5F0E1",
                                            }}
                                            formatter={(value) => [`${value} / 10`, ""]}
                                        />
                                    </RadarChart>
                                </ResponsiveContainer>}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>


            <div className="mt-4 pt-3 border-t border-piano-border text-center">
                <p className="font-display text-piano-gold text-4xl">
                    {piece.overall.toFixed(1)}
                </p>

                <p className="text-piano-muted text-xs uppercase tracking-widest mt-1">
                    Overall
                </p>
                <a
                    href={youtubeSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 bg-piano-gold text-piano-bg font-bold text-xs uppercase tracking-wide rounded-lg px-2 py-1.5 inline-flex items-center justify-center gap-2 hover:opacity-90 transition cursor-pointer">

                    <Play className="w-3 h-3" fill="currentColor" />
                    Listen
                </a>
            </div>

        </motion.div>
    );
}