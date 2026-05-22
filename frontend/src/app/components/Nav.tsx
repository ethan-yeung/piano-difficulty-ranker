export default function Nav() {

    return (
        <nav className="bg-piano-surface/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-12 py-4 w-full border-b border-piano-border text-piano-cream font-display">

            <a href="#hero" className="text-xl font-bold hover:text-piano-gold transition">
                Piano Difficulty Ranker
            </a>

            <div className="flex gap-16">
                <a className="font-medium text-base text-piano-muted hover:text-piano-gold transition" href="#pieces">Pieces</a>
                <a className="font-medium text-base text-piano-muted hover:text-piano-gold transition" href="#compare">Compare</a>
                <a className="font-medium text-base text-piano-muted hover:text-piano-gold transition" href="#criteria">Criteria</a>
            </div>


        </nav>
    )
}