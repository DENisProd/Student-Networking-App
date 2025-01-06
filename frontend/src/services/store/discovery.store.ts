import { create } from "zustand";
import { UserProfile } from "../models/UserProfile";
import userService from "../user.service";

interface DiscoveryStore {
    profiles: UserProfile[];
    userProfile: UserProfile;
    page: number;

    fetchRandomProfiles: (profileId: number) => void;
    fetchProfileById: (profileId: number) => void;
}

export const useDiscoveryStore = create<DiscoveryStore>((set, get) => ({
    profiles: [],
    userProfile: {} as unknown as UserProfile,
    page: 0,

    fetchRandomProfiles: async (profileId: number) => {
        const { page, profiles } = get();
        userService.fetchRandomUserProfiles(page, 10, profileId).then((response) => {
            set({
                profiles: [...profiles, ...response],
                // page: page + 1
            });
        });
    },
    fetchProfileById: (profileId: number) => {
        userService.fetchUserProfile(profileId).then((res) => {
            set({ userProfile: res });
        });
    },
}));
