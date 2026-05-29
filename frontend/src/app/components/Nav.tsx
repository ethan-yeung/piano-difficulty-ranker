type NavProps = {
    onCriteriaClick: () => void;
}

export default function Nav({ onCriteriaClick }: NavProps) {

    return (
        <nav className="bg-piano-surface/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-4 md:px-8 lg:px-12 py-4 w-full border-b border-piano-border text-piano-cream font-display">

            <a href="#hero" className="text-xl font-bold hover:text-piano-gold transition">
                Rankey
            </a>

            <div className="flex gap-6 md:gap-12 lg:gap-16">
                <a className="font-medium text-base text-piano-cream hover:text-piano-gold transition" href="#pieces">Repertoire</a>
                <a className="font-medium text-base text-piano-cream hover:text-piano-gold transition" href="#compare">Compare</a>
                <button
                    type="button"
                    onClick={onCriteriaClick}
                    className="text-piano-cream hover:text-piano-gold font-medium text-base transition cursor-pointer"
                >
                    Criteria
                </button>
            </div>


        </nav>
    )
}