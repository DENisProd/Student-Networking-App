import { create } from "zustand";

interface NavigationState {
    isHidden: boolean;
    showNavigation: () => void;
    hideNavigation: () => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
    isHidden: false,
    showNavigation: () => set({ isHidden: false }),
    hideNavigation: () => set({ isHidden: true }),
}));
