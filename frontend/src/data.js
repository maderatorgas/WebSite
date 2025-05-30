// src/data.js
export const fetchBooks = async () => {
  try {
    const response = await fetch("http://localhost:8000/books"); // ✅ Правильний URL
    if (!response.ok) {
      throw new Error("Помилка при завантаженні книг");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Помилка fetchBooks:", error);
    return [];
  }
};