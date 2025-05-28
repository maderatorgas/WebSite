import React from "react";

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <h3>{book.title || "Без назви"}</h3>
      <p>Жанр: {book.genre || "Невідомо"}</p>
      <p>Рік видання: {book.year || "Невідомо"}</p>
    </div>
  );
};

export default BookCard;
