import { motion } from "framer-motion"
import { X } from "lucide-react";

type HowItWorksModalProps = {
    onClose: () => void;
}

export default function HowItWorksModal({ onClose }: HowItWorksModalProps) {

    const FEATURES = [
        { label: "Home", description: "Search any piece or composer to jump straight to it." },
        { label: "Repertoire", description: "Browse all 60 pieces, filter by difficulty tier, and click any piece for a detailed breakdown plus a link to listen on YouTube. Hit the + to add a piece to Compare." },
        { label: "Compare", description: "Stack pieces head-to-head. Gold highlights where each piece is hardest relative to the others, with a stars / radar chart view." },
        { label: "Voting", description: "Vote on which of two pieces is harder. Toggle between ranking by playing it vs just listening, or skip if you're unsure." },
        { label: "Leaderboard", description: "See how the community has ranked pieces via an Elo system, with separate rankings for players and listeners." },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 backdrop-blur-md bg-black/40 flex items-start md:items-center justify-center z-50 p-6 overflow-y-auto"
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
                    className="absolute top-4 right-4 p-2 -m-2 text-piano-muted hover:text-piano-cream cursor-pointer transition"
                >
                    <X className="w-5 h-5" />
                </button>

                <h2 className="font-display text-piano-cream text-2xl md:text-3xl mb-2">How It Works</h2>
                <div className="space-y-4 text-piano-muted text-sm mb-8 mt-6">
                    <p>
                        Rankey ranks classical piano pieces by difficulty across five weighted dimensions, with a community vote area as well. Here's a quick guide for each section.
                    </p>
                </div>

                <div className="space-y-3">
                    {FEATURES.map(feat => (
                        <div key={feat.label} className="flex items-center gap-2 md:gap-4 px-3 py-3 border border-piano-border rounded">
                            <span className="text-piano-cream text-sm font-bold w-28 md:w-44 shrink-0">
                                {feat.label}
                            </span>
                            <span className="text-piano-muted text-xs flex-1">
                                {feat.description}
                            </span>
                        </div>
                    ))}
                </div>

            </motion.div>
        </motion.div>
    )
}