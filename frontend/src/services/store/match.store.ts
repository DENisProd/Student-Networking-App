import { create } from "zustand";
import { Match } from "../models/Match";
import matchService from "../match.service";

interface MatchStore {
    matches: Match[];
    
    fetchMatches: () => void;
}

export const useMatchStore = create<MatchStore>((set, get) => ({
    matches: [],
    
    fetchMatches: () => {
        matchService.fetchMatches().then(res => {
            set({ matches: res })
        });
    },
}))