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
    youtube_url: string;
};


export type Winners = {
    technicality: number;
    musicality: number;
    rhythmic_complexity: number;
    endurance: number;
    ornamentation: number;
    overall: number;
};


export type VoteType = "player" | "listener";


export type Rating = {
    id: number;
    piece_id: number;
    vote_type: VoteType;
    elo: number;
    win_count: number;
    loss_count: number;
};

export type VoteResult = {
    winner: Rating;
    loser: Rating;
    winner_delta: number;
    loser_delta: number;
};