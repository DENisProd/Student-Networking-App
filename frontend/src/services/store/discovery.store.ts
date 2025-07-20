import { create } from "zustand";
import { UserProfile } from "../models/UserProfile";
import userService from "../user.service";

interface DiscoveryStore {
    profiles: UserProfile[];
    userProfile: UserProfile;
    page: number;
    hasMore: boolean;
    isLoading: boolean;

    fetchRandomProfiles: (profileId: number) => void;
    fetchProfileById: (profileId: number) => void;
    resetProfiles: () => void;
}

export const useDiscoveryStore = create<DiscoveryStore>((set, get) => ({
    profiles: [],
    userProfile: {} as unknown as UserProfile,
    page: 0,
    hasMore: true,
    isLoading: false,

    fetchRandomProfiles: async (profileId: number) => {
        const { page, profiles, hasMore, isLoading } = get();
        
        // Если уже загружаем или нет больше данных, не делаем запрос
        if (isLoading || !hasMore) return;
        
        set({ isLoading: true });
        
        try {
            const response = await userService.fetchRandomUserProfiles(page, 10, profileId);
            
            // Проверяем, есть ли данные в ответе
            if (response && response.length > 0) {
                set({
                    profiles: [...profiles, ...response],
                    page: page + 1,
                    hasMore: true,
                    isLoading: false
                });
            } else {
                // Если данных нет, останавливаем загрузку
                set({
                    hasMore: false,
                    isLoading: false
                });
            }
        } catch (error) {
            console.error("Ошибка при загрузке профилей:", error);
            set({ 
                hasMore: false,
                isLoading: false 
            });
        }
    },
    
    fetchProfileById: (profileId: number) => {
        userService.fetchUserProfile(profileId, null).then((res) => {
            set({ userProfile: res });
        });
    },
    
    resetProfiles: () => {
        set({
            profiles: [],
            page: 0,
            hasMore: true,
            isLoading: false
        });
    },
}));
