import { create } from "zustand";

interface PreloaderState {
    isLoading: boolean;
    showPreloader: () => void;
    hidePreloader: () => void;
}

export const usePreloaderStore = create<PreloaderState>((set) => ({
    isLoading: false,
    showPreloader: () => set({ isLoading: true }),
    hidePreloader: () => set({ isLoading: false }),
}));
