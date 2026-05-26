import { Piece } from "../lib/types";
import { X } from "lucide-react";
import DifficultyStars from "./DifficultyStars";
import { Winners } from "../lib/types";
import { motion } from "framer-motion";

type CompareCardProps = {
    piece: Piece;
    onRemove: () => void;
    winners: Winners | null;
};


export default function CompareCard({ piece, onRemove, winners }: CompareCardProps) {

    const DIMENSIONS = [
        { key: "technicality", label: "Technicality", value: piece.technicality },
        { key: "musicality", label: "Musicality", value: piece.musicality },
        { key: "rhythmic_complexity", label: "Rhythmic Comp.", value: piece.rhythmic_complexity },
        { key: "endurance", label: "Endurance", value: piece.endurance },
        { key: "ornamentation", label: "Ornamentation", value: piece.ornamentation },
    ];

    const isOverallWinner = winners !== null && piece.overall === winners.overall;

    return (
        <motion.div
            animate={{
                boxShadow: isOverallWinner ? [
                    "0 0 0px rgba(212,167,68,0)",
                    "0 0 30px rgba(212,167,68,0.4)",
                    "0 0 0px rgba(212,167,68,0)"
                ] : "0 0 0px rgba(212,167,68,0)"
            }}
            transition={{
                duration: 2,
                repeat: isOverallWinner ? Infinity : 0,
                ease: "easeInOut"
            }}
            className="relative rounded-lg bg-piano-surface border border-piano-border p-6"
        >
            <button
                type="button"
                onClick={onRemove}
                aria-label="Remove from comparison"
                className="absolute top-5 right-5 text-piano-muted hover:text-piano-cream cursor-pointer transition"
            >
                <X className="w-5 h-5" />
            </button>

            <p className="text-piano-gold font-bold text-xs uppercase tracking-wide mb-1">
                {piece.tier}
            </p>

            <h3 className="font-display text-piano-cream text-xl mb-1 pr-6">
                {piece.title}
            </h3>

            <p className="text-piano-muted text-sm mb-6">{piece.composer}</p>

            <div className="space-y-2">
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
            </div>

            <div className="mt-6 pt-4 border-t border-piano-border text-center">
                <p className="font-display text-piano-gold text-4xl">
                    {piece.overall.toFixed(1)}
                </p>

                <p className="text-piano-muted text-xs uppercase tracking-widest mt-1">
                    Overall
                </p>
            </div>

        </motion.div>
    );
}