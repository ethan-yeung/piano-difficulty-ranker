import { motion } from "framer-motion"
import { X } from "lucide-react";

type CriteriaModalProps = {
    onClose: () => void;
}

export default function CriteriaModal({ onClose }: CriteriaModalProps) {

    const CRITERIA = [
        { label: "Technicality", weight: 0.30, description: "Precision, speed, hand independence, jumps, and stretch." },
        { label: "Musicality", weight: 0.30, description: "Phrasing, articulation, voicing, dynamic shaping, and interpretive depth required." },
        { label: "Rhythmic Complexity", weight: 0.15, description: "Polyrhythms, syncopation, Irregular meters, and tempo shifts." },
        { label: "Endurance", weight: 0.15, description: "Sustained physical effort required for the piece." },
        { label: "Ornamentation", weight: 0.10, description: "Trills, mordents, grace notes, and other embellishments." },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 backdrop-blur-md bg-black/40 flex items-center justify-center z-50 p-6"
            onClick={onClose}>

            <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.25 }}
                className="bg-piano-surface border border-piano-border rounded-lg max-w-3xl w-full p-6 md:p-10 relative"
                onClick={e => e.stopPropagation()}>

                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute top-4 right-4 text-piano-muted hover:text-piano-cream cursor-pointer transition"
                >
                    <X className="w-5 h-5" />
                </button>

                <h2 className="font-display text-piano-cream text-3xl mb-2">How Pieces Are Ranked</h2>
                <div className="space-y-4 text-piano-muted text-sm mb-8 mt-6">
                    <p>
                        Difficulty is obviously a relative concept. These rankings are just a structured way to compare pieces using consistent criteria.
                    </p>
                    <p>
                        Every piece is scored from 0 – 10 across five dimensions. Each dimension
                        has a weight reflecting how much it contributes to overall difficulty.
                        The weighted sum is then the piece's overall score.
                    </p>
                </div>

                <div className="space-y-3">
                    {CRITERIA.map(crit => (
                        <div key={crit.label} className="flex items-start gap-2 md:gap-4 px-3 py-3 border border-piano-border rounded">
                            <span className="text-piano-cream text-sm font-bold w-28 md:w-44 shrink-0">
                                {crit.label}
                            </span>
                            <span className="text-piano-gold text-sm font-bold w-12 shrink-0">
                                {(crit.weight * 100).toFixed(0)}%
                            </span>
                            <span className="text-piano-muted text-xs flex-1">
                                {crit.description}
                            </span>
                        </div>
                    ))}
                </div>

            </motion.div>
        </motion.div>
        
    )
}