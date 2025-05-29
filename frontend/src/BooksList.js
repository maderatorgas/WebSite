import React, { useState } from "react";

const BooksList = ({ books, layout, isAuthenticated }) => {
  const [selectedBook, setSelectedBook] = useState(null);

  const handleBookClick = (book) => {
    if (isAuthenticated) {
      setSelectedBook(book);
    }
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  if (!books.length) {
    return <p>Книги не знайдено.</p>;
  }

  return (
    <>
      <div className={`books-list ${layout === "grid" ? "grid" : "list"}`}>
        {books.map((book) => (
          <div
            key={book.id}
            className="book-card"
            onClick={() => handleBookClick(book)}
            style={{ cursor: isAuthenticated ? "pointer" : "default" }}
          >
            <img
              src={book.image}
              alt={book.title}
              className="book-cover"
              style={{ width: "100%", borderRadius: "8px", marginBottom: "0.5rem" }}
            />
            <h3>{book.title}</h3>
            <p>Жанр: {typeof book.genre === "object" ? book.genre.name : book.genre}</p>
          </div>
        ))}
      </div>

      {selectedBook && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} style={{ float: "right" }}>✖</button>
            <img
              src={selectedBook.image}
              alt={selectedBook.title}
              style={{ width: "100%", borderRadius: "8px", marginBottom: "1rem" }}
            />
            <h2>{selectedBook.title}</h2>
            <p><strong>Жанр:</strong> {typeof selectedBook.genre === "object" ? selectedBook.genre.name : selectedBook.genre}</p>
            <p><strong>Опис:</strong> {selectedBook.description}</p>
            <p><strong>Ціна:</strong> {selectedBook.price} грн</p>
            <p><strong>Рейтинг:</strong> {selectedBook.rating} / 5</p>
          </div>
        </div>
      )}
    </>
  );
};

export default BooksList;
