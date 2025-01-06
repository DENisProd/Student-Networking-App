import { Media } from "./Media";

export interface Match {
    id: number;
    profileId: number;
    profile: MatchUserProfile;
}

export interface MatchUserProfile {
    id: number;
    about: string;
    description: string;
    interests: number[];
    target: number;
    mediaList: Media[]
}