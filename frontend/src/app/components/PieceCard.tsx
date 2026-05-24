import DifficultyStars from "./DifficultyStars";
import { Piece } from "../lib/types";

type PieceCardProps = {
    piece: Piece;
    onClick: () => void;
};

export default function PieceCard({ piece, onClick }: PieceCardProps) {
    return (
        <div className="rounded-lg bg-piano-surface p-8 border border-piano-border cursor-pointer 
            hover:border-piano-gold hover:shadow-[0_0_20px_rgba(212,167,68,0.3)] transition duration-300"
            onClick={onClick}>
            <p className="text-piano-gold font-bold mb-2">{piece.tier}</p>
            <h2 className="font-display text-piano-cream text-2xl mb-0.5">{piece.title}</h2>
            <p className="text-piano-muted text-sm mb-4">{piece.composer}</p>

            <div className="flex items-center gap-2">
                <DifficultyStars score={piece.overall} />
                <span className="text-piano-muted text-sm">{piece.overall}/10</span>
            </div>
        </div>
    );
}