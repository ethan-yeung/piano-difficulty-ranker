import { Search, X} from "lucide-react";


type SearchBarProps = {
    query: string;
    setQuery: (value: string) => void;
}

export default function SearchBar({query, setQuery} : SearchBarProps) {

    return (
        <div className="relative w-full max-w-xl mt-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-piano-muted pointer-events-none" />
            <input
                type="text" placeholder="Search pieces or composers..."
                value = {query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-piano-surface border border-piano-border rounded-lg py-3 pl-12 pr-12 text-piano-cream placeholder:text-piano-muted focus:ring-2 focus:ring-piano-gold focus:outline-none transition"
            />
            {query.length > 0 && (
                <button 
                    type="button" 
                    onClick={() => setQuery("")} 
                    aria-label="Clear search"
                    className="text-piano-muted absolute right-4 top-1/2 -translate-y-1/2 hover:text-piano-gold transition cursor-pointer">
                    <X className="w-5 h-5"/>
                </button>
            )}
        </div>
    )
}