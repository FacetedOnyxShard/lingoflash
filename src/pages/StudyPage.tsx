import React, { useState, useEffect, useCallback } from "react";
import type { Card } from "../types/card";
import { getCards, updateCard, deleteCard } from "../utils/storage";
import styles from "./StudyPage.module.css";

const StudyPage: React.FC = () => {
  const [allCards, setAllCards] = useState<Card[]>([]);
  const [studyQueue, setStudyQueue] = useState<Card[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);

  // Загрузка карточек и фильтрация для изучения (только невыученные)
  useEffect(() => {
    const loadCards = () => {
      const loadedCards = getCards();
      setAllCards(loadedCards);
      const toStudy = loadedCards.filter(card => !card.learned);
      setStudyQueue(toStudy);
      setCurrentIndex(0);
      setShowBack(false);
    };
    loadCards();
  }, []);

  // Обновление очереди после изменений в allCards
  useEffect(() => {
    const toStudy = allCards.filter(card => !card.learned);
    setStudyQueue(toStudy);
    if (currentIndex >= toStudy.length) {
      setCurrentIndex(Math.max(0, toStudy.length - 1));
    }
  }, [allCards, currentIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
    setShowBack(false);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < studyQueue.length - 1 ? prev + 1 : prev));
    setShowBack(false);
  }, [studyQueue.length]);

  const toggleFlip = useCallback(() => {
    setShowBack((prev) => !prev);
  }, []);

  // Обработка клавиш
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        toggleFlip();
      } else if (e.code === "ArrowLeft") {
        handlePrev();
      } else if (e.code === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleFlip, handlePrev, handleNext]);

  const handleQuality = (quality: 0 | 1 | 2) => {
    if (studyQueue.length === 0) return;

    const currentCard = studyQueue[currentIndex];
    const learned = quality >= 2; // "Легко" → выучено

    const updatedCard: Card = {
      ...currentCard,
      lastReviewed: new Date(),
      quality,
      learned: learned ? true : currentCard.learned,
    };

    updateCard(updatedCard);
    setAllCards(prev => prev.map(c => c.id === updatedCard.id ? updatedCard : c));

    setStudyQueue(prev => {
      if (learned) {
        const newQueue = prev.filter(c => c.id !== updatedCard.id);
        if (currentIndex >= newQueue.length) {
          setCurrentIndex(Math.max(0, newQueue.length - 1));
        }
        return newQueue;
      } else {
        // Перемещаем в конец очереди для повторения
        const otherCards = prev.filter(c => c.id !== updatedCard.id);
        const newQueue = [...otherCards, updatedCard];
        setCurrentIndex(0);
        return newQueue;
      }
    });

    setShowBack(false);
  };

  const handleDelete = () => {
    if (studyQueue.length === 0) return;
    const currentCard = studyQueue[currentIndex];
    if (window.confirm(`Удалить карточку "${currentCard.word}"?`)) {
      deleteCard(currentCard.id);
      setAllCards(prev => prev.filter(c => c.id !== currentCard.id));
    }
  };

  if (studyQueue.length === 0) {
    return (
      <div className={styles.studyPage}>
        <h1 className={styles.title}>Изучение слов</h1>
        <p className={styles.emptyMessage}>
          🎉 Поздравляем! Все слова изучены!<br />
          Добавьте новые слова на странице "Добавить".
        </p>
      </div>
    );
  }

  const currentCard = studyQueue[currentIndex];

  return (
    <div className={styles.studyPage}>
      <h1 className={styles.title}>Изучение слов</h1>
      
      <div className={styles.cardContainer} onClick={toggleFlip}>
        <div className={`${styles.flashcard} ${showBack ? styles.flipped : ''}`}>
          <div className={styles.flashcardFront}>
            <div className={styles.word}>{currentCard.word}</div>
            {currentCard.transcription && (
              <div className={styles.transcription}>[{currentCard.transcription}]</div>
            )}
          </div>
          <div className={styles.flashcardBack}>
            <div className={styles.word}>{currentCard.translation}</div>
            {currentCard.example && (
              <div className={styles.example}>Пример: {currentCard.example}</div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.counter}>
        {currentIndex + 1} / {studyQueue.length}
      </div>

      <div className={styles.navigation}>
        <button 
          onClick={handlePrev} 
          disabled={currentIndex === 0}
          className={styles.navButton}
        >
          ← Предыдущая
        </button>
        <button 
          onClick={handleNext} 
          disabled={currentIndex === studyQueue.length - 1}
          className={styles.navButton}
        >
          Следующая →
        </button>
      </div>

      <div className={styles.qualityButtons}>
        <p className={styles.qualityHint}>Как хорошо вы знаете это слово?</p>
        <div className={styles.buttonsGrid}>
          <button 
            onClick={() => handleQuality(0)} 
            className={`${styles.qualityButton} ${styles.hard}`}
          >
            Сложно
          </button>
          <button 
            onClick={() => handleQuality(1)} 
            className={`${styles.qualityButton} ${styles.good}`}
          >
            Нормально
          </button>
          <button 
            onClick={() => handleQuality(2)} 
            className={`${styles.qualityButton} ${styles.easy}`}
          >
            Легко
          </button>
        </div>
      </div>

      <button onClick={handleDelete} className={styles.deleteButton}>
        🗑️ Удалить карточку
      </button>
    </div>
  );
};

export default StudyPage;
