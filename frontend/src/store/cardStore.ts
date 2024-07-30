import { create } from "zustand";
import api from "../http/base_api";

export interface Card {
    id: string;
    name: string;
    author: string;
    image: string;
    price: number;
    cardTypeId: number;
}

interface CardState {
    cards: Card[] | null;
    getCards: () => void;
}

const useCardStore = create<CardState>((set) => ({
    cards: null,

    getCards: async () => {
        try {
            const response = await api.get("cards");
            set(() => ({ cards: response.data }));
        } catch {}
    },
}));

export default useCardStore;
