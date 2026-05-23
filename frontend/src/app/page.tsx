"use client";
import { useState, useEffect } from "react";
import PieceCard from "./components/PieceCard";
import Nav from "./components/Nav";
import SearchBar from "./components/SearchBar";

const TIERS = [
    "Beginner",
    "Late Beg / Early Inter",
    "Intermediate",
    "Late Inter / Early Adv",
    "Advanced",
    "Virtuoso",
];

export default function Home() {
    const [pieces, setPieces] = useState([]);
    const [query, setQuery] = useState("");
    const [selectedTiers, setSelectedTiers] = useState<Set<string>>(new Set());


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

                <div className="flex flex-wrap gap-2 justify-center max-w-screen-2xl mx-auto mb-8 mt-8">
                    {TIERS.map(tier => (
                        <button key={tier} type="button"
                            onClick={() => toggleTier(tier)}
                            className={`px-4 py-2 rounded-full border text-sm font-medium transition cursor-pointer ${selectedTiers.has(tier)
                                ? "border-piano-gold text-piano-gold bg-piano-gold/10"
                                : "border-piano-border text-piano-muted hover:text-piano-cream hover:border-piano-cream"
                                }`}>
                            {tier}
                        </button>
                    ))}
                </div>



                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-2xl mx-auto">
                    {sorted.map(piece => (<PieceCard key={piece.id} piece={piece} />))}
                </div>

                {sorted.length === 0 && (query.trim() !== "" || selectedTiers.size > 0) && (
                    <p className="text-piano-muted text-center mt-12 text-lg">
                        No pieces found
                    </p>
                )}

            </section>
        </>
    );
}