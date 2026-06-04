"use client";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

type NavProps = { onCriteriaClick: () => void };

export default function Nav({ onCriteriaClick }: NavProps) {
    const [open, setOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);
    const links = [
        { label: "Repertoire", href: "#pieces" },
        { label: "Compare", href: "#compare" },
        { label: "Vote", href: "#vote" },
        { label: "Leaderboard", href: "#leaderboard" },
    ];

    useEffect(() => {
        function onClickOutside(e: MouseEvent) {
            if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(false);
        }
        document.addEventListener("mousedown", onClickOutside);
        return () => document.removeEventListener("mousedown", onClickOutside);
    }, []);

    return (

        <nav ref={navRef} className="bg-piano-surface/80 backdrop-blur-md sticky top-0 z-50 px-4 md:px-8 lg:px-12 py-4 w-full border-b border-piano-border text-piano-cream font-display">
            <div className="flex items-center justify-between">
                <a href="#hero" className="text-xl font-bold hover:text-piano-gold transition">Rankey</a>

                <div className="hidden md:flex gap-6 lg:gap-12 items-center">
                    {links.map(l => (
                        <a key={l.href} href={l.href} className="font-medium text-base hover:text-piano-gold transition">{l.label}</a>
                    ))}
                    <button type="button" onClick={onCriteriaClick} className="hover:text-piano-gold font-medium text-base transition cursor-pointer">Criteria</button>
                </div>

                <button type="button" onClick={() => setOpen(o => !o)} aria-label="Menu" className="md:hidden p-2 -m-2 hover:text-piano-gold cursor-pointer transition">
                    {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {open && (
                <div className="md:hidden flex flex-col gap-4 mt-4 pb-1">
                    {links.map(l => (
                        <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="font-medium text-base hover:text-piano-gold transition">{l.label}</a>
                    ))}
                    <button type="button" onClick={() => { onCriteriaClick(); setOpen(false); }} className="text-left hover:text-piano-gold font-medium text-base transition cursor-pointer">Criteria</button>
                </div>
            )}
        </nav>
    );
}