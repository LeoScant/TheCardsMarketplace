import useStore from "../store/store";
import api from "./api";
import { getOwnedCards } from "./cards.api";

export const createTrade = async (cardFrom: number, cardTo: number) => {
    await api.post('/trades', { cardFrom, cardTo });
}

export const acceptTrade = async (tradeId: number) => {
    await api.post(`/trades/${tradeId}/accept`);
    await getOwnedCards();
    await getTrades();
}

export const getTrades = async () => {
    const response = await api.get('/trades');
    const trades = response.data;
    useStore.getState().setTrades(trades);
}
