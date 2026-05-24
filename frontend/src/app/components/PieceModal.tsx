import { Piece } from "../lib/types";
import { X, Play } from "lucide-react";
import DifficultyStars from "./DifficultyStars";

type PieceModalProp = {
    piece: Piece;
    onClose: () => void;
}

export default function PieceModal({ piece, onClose }: PieceModalProp) {

    const DIMENSIONS = [
        { label: "Technicality", value: piece.technicality, weight: 0.30 },
        { label: "Musicality", value: piece.musicality, weight: 0.30 },
        { label: "Rhythmic Complexity", value: piece.rhythmic_complexity, weight: 0.15 },
        { label: "Endurance", value: piece.endurance, weight: 0.15 },
        { label: "Ornamentation", value: piece.ornamentation, weight: 0.10 },
    ];
    const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(piece.title + " " + piece.composer)}`;

    return (
        <div className="fixed inset-0 backdrop-blur-md bg-black/40 flex items-center justify-center z-50 p-6"
            onClick={onClose}>

            <div className="bg-piano-surface border border-piano-border rounded-lg max-w-3xl w-full p-10 relative"
                onClick={e => e.stopPropagation()}>

                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute top-4 right-4 text-piano-muted hover:text-piano-cream cursor-pointer transition"
                >
                    <X className="w-5 h-5" />
                </button>

                <p className="text-piano-gold font-bold text-sm uppercase tracking-wide mb-2">
                    {piece.tier}
                </p>
                <h2 className="font-display text-piano-cream text-3xl mb-2">{piece.title}</h2>
                <p className="text-piano-muted mb-8">{piece.composer}</p>

                <div className="flex gap-8">
                    <div className="flex-1 space-y-1">
                        {DIMENSIONS.map(dim => (
                            <div key={dim.label} className="flex items-center gap-6 py-2">
                                <span className="text-piano-cream text-sm w-40 shrink-0">{dim.label}</span>
                                <DifficultyStars score={dim.value} />
                                <span className="text-piano-muted text-sm">{dim.value.toFixed(1)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="w-48 flex flex-col gap-4">
                        <div className="bg-piano-bg border border-piano-border rounded-lg p-6 text-center">
                            <p className="font-display text-piano-gold text-5xl">
                                {piece.overall.toFixed(1)}
                            </p>
                            <p className="text-piano-muted text-xs uppercase tracking-widest mt-2">
                                Overall
                            </p>
                        </div>

                        <a
                            href={youtubeSearchUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-piano-gold text-piano-bg font-bold text-sm uppercase tracking-wide rounded-lg px-4 py-3 flex items-center justify-center gap-2 hover:opacity-90 transition cursor-pointer">
                        
                            <Play className="w-4 h-4" fill="currentColor" />
                            Listen
                        </a>

                    </div>
                </div>
            </div>
        </div>
    )
}