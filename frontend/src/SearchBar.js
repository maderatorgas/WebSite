import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="search-bar">
      <label htmlFor="search-input" className="search-label">Назва:</label>
      <input
        id="search-input"
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Пошук за назвою книги"
      />
    </div>
  );
};

export default SearchBar;
