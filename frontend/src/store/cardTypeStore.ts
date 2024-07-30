import { create } from "zustand";
import api from "../http/base_api";

interface CardType {
    id: number;
    stars: number;
    typeDescription: string;
}

interface CardTypeState {
    cardTypes: CardType[] | null;
    getCardTypes: () => void;
}

const useCardTypeStore = create<CardTypeState>((set) => ({
    cardTypes: null,

    getCardTypes: async () => {
        try {
            const response = await api.get("card-type");
            set(() => ({ cardTypes: response.data }));
        } catch {}
    },
}));

export default useCardTypeStore;
