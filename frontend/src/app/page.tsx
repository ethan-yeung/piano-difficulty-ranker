"use client";
import { useState, useEffect } from "react";
import PieceCard from "./components/PieceCard";
import Nav from "./components/Nav";
import SearchBar from "./components/SearchBar";

export default function Home() {
    const [pieces, setPieces] = useState([]);
    const [query, setQuery] = useState("");


    useEffect(() => {
        async function load() {
            const response = await fetch('http://localhost:8000/pieces');
            const data = await response.json();
            setPieces(data);
        }
        load();
    }, []);

    const normalize = (str: string) =>
       str.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const q = normalize(query);
    const filtered = pieces.filter(piece =>
        normalize(piece.title).includes(q) ||
        normalize(piece.composer).includes(q)
    );
    
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

            <section
                id="pieces"
                className="px-8 py-16"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-2xl mx-auto">
                    {filtered.map(piece => (<PieceCard key={piece.id} piece={piece}/>))}
                </div>

            </section>
        </>
    );
}