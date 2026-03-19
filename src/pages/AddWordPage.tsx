import React, { useState } from "react";
import type { Card } from "../types/card";
import { getCards, saveCards } from "../utils/storage";

const AddWordPage: React.FC = () => {
  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [example, setExample] = useState("");
  const [transcription, setTranscription] = useState("");
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleWordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setWord(e.target.value);
  const handleTranslationChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTranslation(e.target.value);
  const handleExampleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setExample(e.target.value);
  const handleTranscriptionChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTranscription(e.target.value);

  const resetForm = () => {
    setWord("");
    setTranslation("");
    setExample("");
    setTranscription("");
  };

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!word.trim() || !translation.trim()) {
      showNotification(
        "error",
        'Поля "Слово" и "Перевод" обязательны для заполнения',
      );
      return;
    }

    const newCard: Card = {
      id: Date.now().toString(),
      word: word.trim(),
      translation: translation.trim(),
      example: example.trim() || undefined,
      transcription: transcription.trim() || undefined,
      createdAt: new Date(),
      learned: false,
    };

    try {
      // Получаем существующие карточки
      const existingCards = getCards();
      // Добавляем новую карточку
      const updatedCards = [...existingCards, newCard];
      // Сохраняем обновленный массив
      saveCards(updatedCards);

      showNotification("success", "Карточка успешно добавлена!");
      resetForm();
    } catch (error) {
      showNotification("error", "Ошибка при сохранении карточки");
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <h2>Добавить новую карточку</h2>

      {notification && (
        <div
          style={{
            padding: "10px",
            marginBottom: "15px",
            backgroundColor:
              notification.type === "success" ? "#d4edda" : "#f8d7da",
            color: notification.type === "success" ? "#155724" : "#721c24",
            border: `1px solid ${notification.type === "success" ? "#c3e6cb" : "#f5c6cb"}`,
            borderRadius: "4px",
          }}
        >
          {notification.message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="word"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Слово <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            id="word"
            value={word}
            onChange={handleWordChange}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="translation"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Перевод <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            id="translation"
            value={translation}
            onChange={handleTranslationChange}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="example"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Пример использования
          </label>
          <textarea
            id="example"
            value={example}
            onChange={handleExampleChange}
            rows={3}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="transcription"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Транскрипция
          </label>
          <input
            type="text"
            id="transcription"
            value={transcription}
            onChange={handleTranscriptionChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Добавить карточку
        </button>
      </form>
    </div>
  );
};

export default AddWordPage;
