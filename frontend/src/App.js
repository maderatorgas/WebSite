import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import FilterOptions from "./FilterOptions";
import BooksList from "./BooksList";

// ✅ Імпортуємо getBooks з api.js
import { getBooks } from "./api";

function App() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [layout, setLayout] = useState("grid");
  const [filters, setFilters] = useState({ genre: "", year: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  // Фільтрація книг
  const filterBooks = useCallback(() => {
    let filtered = [...books];

    if (searchQuery) {
      filtered = filtered.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.genre) {
      filtered = filtered.filter((book) => book.genre === filters.genre);
    }

    if (filters.year) {
      const yearNum = parseInt(filters.year);
      if (!isNaN(yearNum)) {
        filtered = filtered.filter((book) => book.year === yearNum);
      }
    }

    setFilteredBooks(filtered);
  }, [books, searchQuery, filters]);

  // Перевірка авторизації
  useEffect(() => {
    const status = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(status === "true");
  }, []);

  // Завантаження книг з API
  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await getBooks(); // ✅ отримуємо книги через API
        console.log("Отримані книги:", data);
        setBooks(data);
        setFilteredBooks(data);
      } catch (error) {
        console.error("Помилка при завантаженні книг:", error);
      }
    };

    loadBooks();
  }, []);

  // Автоматична фільтрація при зміні пошуку або фільтрів
  useEffect(() => {
    filterBooks();
  }, [filterBooks]);

  // Обробники подій
  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const clearFilters = () => {
    console.log("Очищення фільтрів...");
    setFilters({ genre: "", year: "" });
    setSearchQuery("");
  };

  const toggleLayout = () => {
    setLayout((prev) => (prev === "grid" ? "list" : "grid"));
  };

  return (
    <div className="app">
      <header style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <h1>Список книг</h1>

        <button onClick={toggleLayout}>
          {layout === "grid" ? "Перейти до списку" : "Перейти до сітки"}
        </button>

        <button className="clear-filters-btn" onClick={clearFilters}>
          Очистити фільтри
        </button>

        <div style={{ marginLeft: "auto" }}>
          {!isLoggedIn ? (
            <button onClick={() => navigate("/login")}>Увійти</button>
          ) : (
            <div
              onClick={() => navigate("/user-profile")}
              style={{
                cursor: "pointer",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#4f46e5",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: "20px",
                boxShadow: "0 4px 8px rgba(79, 70, 229, 0.6)",
              }}
              title="Профіль"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") navigate("/user-profile");
              }}
            >
              👤
            </div>
          )}
        </div>
      </header>

      <div className="controls">
        <SearchBar onSearch={handleSearch} />
        <FilterOptions onFilterChange={handleFilterChange} filters={filters} />
      </div>

      <BooksList books={filteredBooks} layout={layout} isAuthenticated={isLoggedIn} />
    </div>
  );
}


export default App;