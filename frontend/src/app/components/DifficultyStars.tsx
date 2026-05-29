import { Star } from "lucide-react";

type DifficultyStarsProps = {
    score: number;
};

export default function DifficultyStars({ score }: DifficultyStarsProps) {
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 >= 0.5;
    const emptyStars = 10 - fullStars - (hasHalfStar ? 1 : 0);

    const fullStarElements = Array(fullStars).fill(0).map((_, i) => (
        <Star key={`full-${i}`} className="w-3 h-3 md:w-4 md:h-4 text-piano-gold" fill="currentColor" />
    ));

    const emptyStarElements = Array(emptyStars).fill(0).map((_, i) => (
        <Star key={`empty-${i}`} className="w-3 h-3 md:w-4 md:h-4 text-piano-gold" />
    ));

    const halfStarElement = hasHalfStar ? (
        <div key="half" className="relative inline-block w-3 h-3 md:w-4 md:h-4">
            <Star className="absolute w-3 h-3 md:w-4 md:h-4 text-piano-gold" />
            <div className="absolute overflow-hidden w-1.5 h-3 md:w-2 md:h-4">
                <Star className="w-3 h-3 md:w-4 md:h-4 text-piano-gold" fill="currentColor" />
            </div>
        </div>
    ) : null;

    return (
        <div className="flex items-center gap-0.5 md:gap-1">
            {fullStarElements}
            {halfStarElement}
            {emptyStarElements}
        </div>
    );
}