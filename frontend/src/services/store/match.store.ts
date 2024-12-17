import { Match } from "../models/Match";

interface MatchStore {
    matches: Match[];
    
    fetchMatches: () => void;
}