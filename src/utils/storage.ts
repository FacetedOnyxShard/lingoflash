import type { Card } from "../types/card";

const STORAGE_KEY = "lingoflash_cards";

export const getCards = (): Card[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      const parsed = JSON.parse(data);
      // Восстанавливаем даты из строк
      return parsed.map((card: any) => ({
        ...card,
        createdAt: new Date(card.createdAt),
        lastReviewed: card.lastReviewed
          ? new Date(card.lastReviewed)
          : undefined,
      }));
    } catch (e) {
      console.error("Failed to parse cards from localStorage", e);
      return [];
    }
  }
  return [];
};

export const saveCards = (cards: Card[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
};

// Добавляем функцию updateCard
export const updateCard = (updatedCard: Card): void => {
  const cards = getCards();
  const updatedCards = cards.map((card) =>
    card.id === updatedCard.id ? updatedCard : card,
  );
  saveCards(updatedCards);
};

// Добавляем функцию deleteCard (может пригодиться)
export const deleteCard = (cardId: string): void => {
  const cards = getCards();
  const updatedCards = cards.filter((card) => card.id !== cardId);
  saveCards(updatedCards);
};
