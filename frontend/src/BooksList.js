import React from "react";
import BookCard from "./BookCard";

const BooksList = ({ books, layout }) => {
  return (
    <div className={`books-list ${layout}`}>
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
      {books.length === 0 ? (
      <p>Книги не знайдено.</p>
      ) : (
      books.map((book) => <BookCard key={book.id} book={book} />)
)}

    </div>
  );
};

export default BooksList;