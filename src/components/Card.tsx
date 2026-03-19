import React, { useState } from "react";
import type { Card as CardType } from "../types";

interface CardProps {
  card: CardType;
  onFlip: () => void;
}

const Card: React.FC<CardProps> = ({ card, onFlip }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    onFlip();
  };

  return (
    <div
      onClick={handleClick}
      style={{
        border: "2px solid #ccc",
        borderRadius: "8px",
        padding: "20px",
        margin: "20px auto",
        maxWidth: "400px",
        minHeight: "200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        backgroundColor: "#f9f9f9",
        color: "#151515",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        transition: "transform 0.3s",
      }}
    >
      {!isFlipped ? (
        <h2 style={{ color: "#151515" }}>{card.word}</h2>
      ) : (
        <div>
          <p>
            <strong>Перевод:</strong> {card.translation}
          </p>
          {card.example && (
            <p>
              <strong>Пример:</strong> {card.example}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Card;
