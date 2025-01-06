import { create } from "zustand";
import Reacts, { ReactResponse } from "../models/Reacts";
import reactsService from "../reacts.service";

interface ReactStore {
    sentReacts: ReactResponse[];
    outgoingReacts: ReactResponse[];

    sendLike: (react: Reacts) => Promise<boolean>;
    fetchReacts: () => void;
}

export const useReactStore = create<ReactStore>((set, get) => ({
    sentReacts: [],
    outgoingReacts: [],

    sendLike: async (react: Reacts) => {
        console.log(react)
        const response = await reactsService.createReact(react);
        return !!response;
    },
    fetchReacts: () => {
        reactsService.fetchOutgoingReacts().then(res => {
            set({
                outgoingReacts: res
            })
        })
    }
}));