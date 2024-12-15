import { create } from "zustand";
import { UserProfile } from "../models/UserProfile";
import userService from "../user.service";

interface DiscoveryStore {
    profiles: UserProfile[];
    page: number;

    fetchRandomProfiles: () => void;
}

export const useDiscoveryStore = create<DiscoveryStore>((set, get) => ({
    profiles: [],
    page: 0,

    fetchRandomProfiles: async () => {
        const { page, profiles } = get();

        userService.fetchRandomUserProfiles(page, 10).then((response) => {
            set({
                profiles: [...profiles,...response],
                page: page + 1
            });
        })
    }
}));