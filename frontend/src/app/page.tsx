"use client";
import { useState, useEffect } from "react";
import PieceCard from "./components/PieceCard";
import Nav from "./components/Nav";
import SearchBar from "./components/SearchBar";
import { TIERS } from "./lib/tiers";
import TierFilter from "./components/TierFilter";
import { Piece } from "./lib/types";
import PieceModal from "./components/PieceModal";
import { AnimatePresence } from "framer-motion";
import CompareCard from "./components/CompareCard";
import { Winners } from "./lib/types";


export default function Home() {
    const [pieces, setPieces] = useState<Piece[]>([]);
    const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null);
    const [query, setQuery] = useState("");
    const [selectedTiers, setSelectedTiers] = useState<Set<string>>(new Set());
    const [compareIds, setCompareIds] = useState<Set<number>>(new Set());


    useEffect(() => {
        async function load() {
            const response = await fetch('http://localhost:8000/pieces');
            const data = await response.json();
            setPieces(data);
        }
        load();
    }, []);

    const normalize = (str: string) =>
        str
            .toLowerCase()
            .trim()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\./g, "")
            .replace(/\s+/g, " ");

    const q = normalize(query);
    const filtered = pieces.filter(piece => {
        const matchesSearch =
            normalize(piece.title).includes(q) ||
            normalize(piece.composer).includes(q);

        const matchesTier =
            selectedTiers.size === 0 || selectedTiers.has(piece.tier);

        return matchesSearch && matchesTier;
    });

    const sorted = [...filtered].sort((a, b) => {
        if (a.tier !== b.tier) {
            return TIERS.indexOf(a.tier) - TIERS.indexOf(b.tier);
        }
        return a.overall - b.overall;
    });

    const toggleTier = (tier: string) => {
        setSelectedTiers(prev => {
            const next = new Set(prev);
            if (next.has(tier)) {
                next.delete(tier);
            } else {
                next.add(tier);
            }
            return next;
        });
    };

    const toggleCompare = (id: number) => {
        setCompareIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else if (next.size < 6) {
                next.add(id);
            }
            return next;
        });
    };

    
    const comparePieces = pieces.filter(p => compareIds.has(p.id));

    const winners = comparePieces.length >= 2 ? {
    technicality: Math.max(...comparePieces.map(p => p.technicality)),
    musicality: Math.max(...comparePieces.map(p => p.musicality)),
    rhythmic_complexity: Math.max(...comparePieces.map(p => p.rhythmic_complexity)),
    endurance: Math.max(...comparePieces.map(p => p.endurance)),
    ornamentation: Math.max(...comparePieces.map(p => p.ornamentation)),
    overall: Math.max(...comparePieces.map(p => p.overall)),
} : null;

    const compareColsClass =
    comparePieces.length === 1 ? "grid-cols-1 max-w-xl mx-auto" :
    comparePieces.length === 2 ? "grid-cols-2 max-w-screen-2xl mx-auto" :
    comparePieces.length === 4 ? "grid-cols-2 max-w-screen-2xl mx-auto" :
    "grid-cols-3 max-w-screen-2xl mx-auto";

    return (
        <>
            <Nav />

            <section
                id="hero"
                className="min-h-[calc(100vh-73px)] flex flex-col items-center justify-center px-6"
            >
                <h1 className="font-display text-piano-cream text-7xl mb-4 text-center">
                    Piano Difficulty Ranker
                </h1>
                <p className="text-piano-muted text-sm uppercase tracking-widest text-center">
                    A weighted comparison of classical piano repertoire
                </p>

                <SearchBar query={query} setQuery={setQuery} />



            </section>

            <section id="pieces" className="px-8 py-16">

                <div className="flex items-center gap-4 mb-4 max-w-screen-2xl mx-auto mt-8">
                    <span className="text-piano-cream text-base uppercase tracking-widest font-bold">
                        Repertoire
                    </span>
                    <div className="h-0.5 bg-piano-gold/35 flex-1" />
                </div>
                <div className="flex items-center justify-between mb-12 max-w-screen-2xl mx-auto">
                    <p className="text-piano-muted text-base">
                        Click a piece for details, or use + to add it to the comparison tool below.
                    </p>
                    <p className="text-piano-muted text-base whitespace-nowrap">
                        <span className={compareIds.size === 6 ? "text-piano-gold font-bold" : ""}>
                            {compareIds.size} / 6
                        </span> selected
                    </p>
                </div>

                <TierFilter selectedTiers={selectedTiers} onToggle={toggleTier} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-2xl mx-auto">
                    {sorted.map(piece => (
                        <PieceCard
                            key={piece.id}
                            piece={piece}
                            onClick={() => setSelectedPiece(piece)}
                            inCompare={compareIds.has(piece.id)}
                            onCompareToggle={() => toggleCompare(piece.id)}
                            compareIsFull={compareIds.size >= 6}
                        />
                    ))}
                </div>

                {sorted.length === 0 && (query.trim() !== "" || selectedTiers.size > 0) && (
                    <p className="text-piano-muted text-center mt-12 text-lg">
                        No pieces found
                    </p>
                )}

            </section>

            <section id="compare" className="px-8 py-16">
                <div className="flex items-center gap-4 mb-12 max-w-screen-2xl mx-auto">
                    <span className="text-piano-cream text-sm uppercase tracking-widest font-bold">
                        Compare
                    </span>
                    <div className="h-0.5 bg-piano-gold/50 flex-1" />
                </div>

                {comparePieces.length === 0 ? (
                    <p className="text-piano-muted text-center max-w-screen-2xl mx-auto">
                        Click the + on any piece above to add it to the comparison.
                    </p>
                ) : (
                    <div className={`grid ${compareColsClass} gap-6`}>
                        {comparePieces.map(piece => (
                            <CompareCard
                                key={piece.id}
                                piece={piece}
                                onRemove={() => toggleCompare(piece.id)}
                                winners={winners}
                            />
                        ))}
                    </div>
                )}
            </section>

            <AnimatePresence>
                {selectedPiece && (
                    <PieceModal piece={selectedPiece} onClose={() => setSelectedPiece(null)} />
                )}
            </AnimatePresence>
        </>
    );
}