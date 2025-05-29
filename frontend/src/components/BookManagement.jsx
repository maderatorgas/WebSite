// src/components/BookManagement.jsx
import React, { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../api";

const BookManagement = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (error) {
        console.error("Помилка завантаження книг:", error);
      }
    };

    loadBooks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Видалити цю книгу?")) return;

    try {
      await deleteBook(id); // Тут має бути реальний запит
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      alert("Не вдалося видалити");
    }
  };

  return (
    <div>
      <h2>Книги</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Назва</th>
            <th>Жанр</th>
            <th>Рік</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.genre}</td>
              <td>{book.year}</td>
              <td>
                <button onClick={() => alert("Редагувати")}>Редагувати</button>
                <button onClick={() => handleDelete(book.id)}>Видалити</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookManagement;