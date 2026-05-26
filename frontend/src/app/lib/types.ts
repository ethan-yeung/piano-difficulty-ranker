export type Piece = {
    id: number;
    tier: string;
    title: string;
    composer: string;
    technicality: number;
    musicality: number;
    rhythmic_complexity: number;
    endurance: number;
    ornamentation: number;
    overall: number;
};

export type Winners = {
    technicality: number;
    musicality: number;
    rhythmic_complexity: number;
    endurance: number;
    ornamentation: number;
    overall: number;
};