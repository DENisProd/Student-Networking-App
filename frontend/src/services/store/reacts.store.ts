import { create } from "zustand";
import Reacts from "../models/Reacts";
import reactsService from "../reacts.service";

interface ReactStore {
    sentReacts: Reacts[];
    outgoingReacts: Reacts[];

    sendLike: (react: Reacts) => Promise<boolean>;
}

export const useReactStore = create<ReactStore>((set, get) => ({
    sentReacts: [],
    outgoingReacts: [],

    sendLike: async (react: Reacts) => {
        console.log(react)
        const response = await reactsService.createReact(react);
        return !!response;
    },
}));