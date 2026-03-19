import React, { useState, useEffect } from "react";
import type { Card } from "../types/card";
import { getCards } from "../utils/storage";

const StatsPage: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    const loaded = getCards();
    setCards(loaded);
  }, []);

  const total = cards.length;
  const learned = cards.filter(c => c.learned).length;
  const notLearned = total - learned;

  const withQuality = cards.filter(c => c.quality !== undefined);
  const avgQuality = withQuality.length
    ? (withQuality.reduce((sum, c) => sum + (c.quality || 0), 0) / withQuality.length).toFixed(1)
    : "Н/Д";

  const lastAdded = [...cards]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>Статистика</h1>
      
      <div style={{ display: "grid", gap: "15px", marginBottom: "30px" }}>
        <div style={{ padding: "15px", background: "#f0f0f0", borderRadius: "8px" }}>
          <strong>Всего карточек:</strong> {total}
        </div>
        <div style={{ padding: "15px", background: "#f0f0f0", borderRadius: "8px" }}>
          <strong>Изучено:</strong> {learned} ({total ? ((learned/total)*100).toFixed(1) : 0}%)
        </div>
        <div style={{ padding: "15px", background: "#f0f0f0", borderRadius: "8px" }}>
          <strong>Осталось изучить:</strong> {notLearned}
        </div>
        <div style={{ padding: "15px", background: "#f0f0f0", borderRadius: "8px" }}>
          <strong>Средняя оценка сложности (0-2):</strong> {avgQuality}
        </div>
      </div>

      <h2>Последние добавленные</h2>
      {lastAdded.length === 0 ? (
        <p>Нет карточек</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {lastAdded.map(card => (
            <li key={card.id} style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
              <strong>{card.word}</strong> — {card.translation}
              <br />
              <small>Добавлено: {new Date(card.createdAt).toLocaleDateString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StatsPage;
