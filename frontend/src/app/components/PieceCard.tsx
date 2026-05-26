import DifficultyStars from "./DifficultyStars";
import { Piece } from "../lib/types";
import { Plus, Check } from "lucide-react";
import { motion } from "framer-motion";

type PieceCardProps = {
    piece: Piece;
    onClick: () => void;
    inCompare: boolean;
    onCompareToggle: () => void;
    compareIsFull: boolean;
};

export default function PieceCard({ piece, onClick, inCompare, onCompareToggle, compareIsFull }: PieceCardProps) {
    const isDisabled = !inCompare && compareIsFull;

    return (

        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }} 
            className="relative rounded-lg bg-piano-surface p-8 border border-piano-border cursor-pointer 
            hover:border-piano-gold hover:shadow-[0_0_20px_rgba(212,167,68,0.3)] transition-[border-color,box-shadow] duration-300"
            onClick={onClick}>
                

            <p className="text-piano-gold font-bold mb-2">{piece.tier}</p>
            <button type="button" disabled={isDisabled} aria-label="Add to compare"
                onClick={(e) => {
                    e.stopPropagation();
                    if (!isDisabled) onCompareToggle();
                }}
                className={`absolute top-4 right-4 transition cursor-pointer ${isDisabled
                    ? "text-piano-muted/40 cursor-not-allowed"
                    : inCompare
                        ? "text-piano-gold"
                        : "text-piano-muted hover:text-piano-gold"
                    }`}>
                <motion.span
                    key={inCompare ? "check" : "plus"}
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.15 }}
                    className="inline-block"
                >
                    {inCompare ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </motion.span>
            </button>
            <h2 className="font-display text-piano-cream text-2xl mb-0.5">{piece.title}</h2>
            <p className="text-piano-muted text-sm mb-4">{piece.composer}</p>

            <div className="flex items-center gap-2">
                <DifficultyStars score={piece.overall} />
                <span className="text-piano-muted text-sm">{piece.overall}/10</span>
            </div>
        </motion.div>
    );
}