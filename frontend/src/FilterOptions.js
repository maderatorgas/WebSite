import React, { useState, useEffect } from "react";

const FilterOptions = ({ onFilterChange, filters }) => {
  const [genreFilter, setGenreFilter] = useState(filters?.genre || "");
  const [yearFilter, setYearFilter] = useState(filters?.year || "");

  // Синхронізація ззовні (наприклад, при очищенні фільтрів)
  useEffect(() => {
    if (filters) {
      setGenreFilter(filters.genre || "");
      setYearFilter(filters.year || "");
    }
  }, [filters]);

  const updateFilters = (newGenre, newYear) => {
    onFilterChange({ genre: newGenre, year: newYear });
  };

  const handleGenreChange = (e) => {
    const value = e.target.value;
    setGenreFilter(value);
    updateFilters(value, yearFilter);
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
    </div>
  );
};

export default FilterOptions;