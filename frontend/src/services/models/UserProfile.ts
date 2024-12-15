import { Category } from "./Category";
import { Media } from "./Media";

export enum SexType {
    MALE = "MALE",
    FEMALE = "FEMALE",
}

export interface UserProfile {
    id: number;
    userId: number;
    name: string;
    about: string;
    description: string;
    rating: number;
    age: number;
    
    isDeleted: boolean;
    isBlocked: boolean;
    isOnline: boolean;

    sex: SexType;

    interests: Category[];
    target: Category;

    createdAt: string;
    lastActivityAt: string;

    mediaList: Media[];
}

export interface UserProfileUpdate {
    id: number;
    name: string;
    about: string;
    description: string;
    age: number;
    sex: SexType;
    targetId: number;
    interests: number[];
}