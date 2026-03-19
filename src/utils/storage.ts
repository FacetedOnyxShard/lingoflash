import type { Card } from "../types";

const STORAGE_KEY = "lingoflash_cards";

export const getCards = (): Card[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      return JSON.parse(data) as Card[];
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
