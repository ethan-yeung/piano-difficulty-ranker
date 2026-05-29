import { TIERS } from "../lib/tiers";

   type TierFilterProps = {
       selectedTiers: Set<string>;
       onToggle: (tier: string) => void;
   };

   export default function TierFilter({ selectedTiers, onToggle }: TierFilterProps) {
       return (
           <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap md:justify-center gap-2 max-w-screen-2xl mx-auto mb-8 mt-8">
               {TIERS.map(tier => (
                   <button
                       key={tier}
                       type="button"
                       onClick={() => onToggle(tier)}
                       className={`px-4 py-2 rounded-full border text-sm font-medium transition cursor-pointer ${
                           selectedTiers.has(tier)
                               ? "border-piano-gold text-piano-gold bg-piano-gold/10"
                               : "border-piano-border text-piano-muted hover:text-piano-cream hover:border-piano-cream"
                       }`}
                   >
                       {tier}
                   </button>
               ))}
           </div>
       );
   }