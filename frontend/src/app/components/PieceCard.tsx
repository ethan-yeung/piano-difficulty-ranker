import { Star } from "lucide-react";
import DifficultyStars from "./DifficultyStars";

type PieceCardProps = {
    piece: {
        id: number;
        title: string;
        composer: string;
        tier: string;
        overall: number;
    };
};

export default function PieceCard({ piece }: PieceCardProps) {
    return (
        <div className="bg-piano-surface p-8 border border-piano-border">
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