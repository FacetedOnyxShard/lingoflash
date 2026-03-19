import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { getCards } from "../utils/storage";
import type { Card as CardType } from "../types";

const StudyPage: React.FC = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadedCards = getCards();
    setCards(loadedCards);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : cards.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < cards.length - 1 ? prev + 1 : 0));
  };

  if (cards.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Нет карточек. Добавьте новую карточку</h2>
        <Link to="/add" style={{ textDecoration: "none", color: "blue" }}>
          Перейти к добавлению карточки
        </Link>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Изучение карточек</h1>
      <Card key={currentIndex} card={currentCard} onFlip={() => {}} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <button onClick={handlePrev} style={buttonStyle}>
          Предыдущая
        </button>
        <span style={{ alignSelf: "center" }}>
          {currentIndex + 1}/{cards.length}
        </span>
        <button onClick={handleNext} style={buttonStyle}>
          Следующая
        </button>
      </div>
    </div>
  );
};

const buttonStyle: React.CSSProperties = {
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
};

export default StudyPage;
