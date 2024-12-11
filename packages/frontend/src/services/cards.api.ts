import useStore from "../store/store";
import { ICard } from "../interfaces/card.interface";
import api from "./api";

export const getCards = async () => {
    const response = await api.get<ICard[]>('/cards/all');
    const cards: ICard[] = response.data;
    useStore.getState().setCards(cards);
};

export const getOwnedCards = async () => {
    const response = await api.get<ICard[]>('/cards');
    const cards: ICard[] = response.data;
    useStore.getState().setOwnedCards(cards);
}

export const likeCard = async (cardId: number) => {
    const response = await api.post<ICard>(`/cards/${cardId}/like`, {});
    useStore.getState().setLikedCards(response.data);
}

export const createCard = async (card: ICard) => {
    const response = await api.post<ICard>(`/cards`, card);
    useStore.getState().addCard(response.data);
    await getOwnedCards();
}

export const deleteCard = async (cardId: number) => {
    await api.delete(`/cards/${cardId}`);
    useStore.getState().deleteCard(cardId);
    await getOwnedCards();
}

    