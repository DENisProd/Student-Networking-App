import { MatchUserProfile } from "./Match";

export default interface Reacts {
    id: number;
    userId: number;
    targetProfileId: number;
    isLike: boolean;
}

export interface ReactResponse {
    id: number;
    profile: MatchUserProfile
}