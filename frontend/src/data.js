// src/data.js
export const fetchBooks = async () => {
  try {
    const response = await fetch("http://localhost:3001/books");
    if (!response.ok) throw new Error("Помилка завантаження книг");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};