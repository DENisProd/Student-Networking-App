import { create } from "zustand";
import { UserProfile } from "../models/UserProfile";
import userService from "../user.service";

interface DiscoveryStore {
    profiles: UserProfile[];
    page: number;

    fetchRandomProfiles: (profileId: number) => void;
}

export const useDiscoveryStore = create<DiscoveryStore>((set, get) => ({
    profiles: [],
    page: 0,

    fetchRandomProfiles: async (profileId: number) => {
        const { page, profiles } = get();
        userService.fetchRandomUserProfiles(page, 10, profileId).then((response) => {
            set({
                profiles: [...profiles,...response],
                // page: page + 1
            });
        })
    }
}));