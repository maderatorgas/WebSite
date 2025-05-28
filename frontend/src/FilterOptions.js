import React, { useState } from "react";

const FilterOptions = ({ onFilterChange }) => {
  const [genreFilter, setGenreFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  const updateFilters = (newGenre, newYear) => {
    onFilterChange({ genre: newGenre, year: newYear });
  };

  const handleGenreChange = (e) => {
    const value = e.target.value;
    setGenreFilter(value);
    updateFilters(value, yearFilter);
  };

  const handleYearChange = (e) => {
    const value = e.target.value;
    setYearFilter(value);
    updateFilters(genreFilter, value);
  };

  return (
    <div className="filter-options">
      <label>
        Жанр:
        <select value={genreFilter} onChange={handleGenreChange}>
          <option value="">Все</option>
          <option value="Фентезі">Фентезі</option>
          <option value="Наукова фантастика">Наукова фантастика</option>
          <option value="Драма">Драма</option>
        </select>
      </label>

      <label>
        Рік видання:
        <input
          type="number"
          placeholder="Введіть рік"
          value={yearFilter}
          onChange={handleYearChange}
        />
      </label>
    </div>
  );
};

export default FilterOptions;
