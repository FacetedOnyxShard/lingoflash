import type { Card } from "../types/card";

const STORAGE_KEY = "lingoflash_cards";

export const getCards = (): Card[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored);
    return parsed.map((card: any) => ({
      ...card,
      createdAt: new Date(card.createdAt),
    }));
  } catch (e) {
    console.error("Failed to parse cards from localStorage", e);
    return [];
  }
};

export const saveCard = (
  cardData: Omit<Card, "id" | "createdAt" | "learned">,
): Card => {
  const cards = getCards();
  const newCard: Card = {
    ...cardData,
    id: Date.now().toString(),
    createdAt: new Date(),
    learned: false,
  };
  cards.push(newCard);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  return newCard;
};

export const updateCard = (
  id: string,
  updatedFields: Partial<Omit<Card, "id" | "createdAt">>,
): Card | null => {
  const cards = getCards();
  const index = cards.findIndex((c) => c.id === id);
  if (index === -1) return null;
  const updatedCard = { ...cards[index], ...updatedFields };
  cards[index] = updatedCard;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  return updatedCard;
};

export const deleteCard = (id: string): boolean => {
  const cards = getCards();
  const filtered = cards.filter((c) => c.id !== id);
  if (filtered.length === cards.length) return false;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
};
