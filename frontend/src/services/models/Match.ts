import { Media } from "./Media";

export interface Match {
    id: number;
    userId: number;
    user: MatchUserProfile;
}

export interface MatchUserProfile {
    id: number;
    about: string;
    description: string;
    interests: number[];
    target: number;
    media: Media
}