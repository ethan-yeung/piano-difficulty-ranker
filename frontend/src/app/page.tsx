"use client";
import { useState, useEffect } from "react";
import PieceCard from "./components/PieceCard";


export default function Home() {
    const [pieces, setPieces] = useState([]);

    useEffect(() => {
        async function load() {
            const response = await fetch('http://localhost:8000/pieces');
            const data = await response.json();
            console.log(data);
            setPieces(data);
        }
        load();
    }, []);

    return (
        <div>
            <div className="text-center py-100 mb-8">
                <h1 className="font-display text-piano-cream text-6xl mb-2">
                    Piano Difficulty Ranker
                </h1>
                <p className="text-piano-muted text-sm uppercase tracking-widest">
                    A weighted comparison of classical piano repertoire
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-2xl mx-auto p-8">

                {pieces.map(piece => (
                    <PieceCard key={piece.id} piece={piece} />
                ))}
            </div>

        </div>
    );
}