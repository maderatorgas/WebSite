import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import FilterOptions from "./FilterOptions";
import BooksList from "./BooksList";
import { fetchBooks } from "./data";

function App() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [layout, setLayout] = useState("grid");
  const [filters, setFilters] = useState({ genre: "", year: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // тимчасово

  const navigate = useNavigate();

  useEffect(() => {
    const loadBooks = async () => {
      const data = await fetchBooks();
      setBooks(data);
      setFilteredBooks(data);
    };
    loadBooks();
  }, []);

  const handleFilterChange = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    filterBooks(searchQuery, updatedFilters);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterBooks(query, filters);
  };

  const filterBooks = (query, filters) => {
    let filtered = [...books];

    if (query) {
      filtered = filtered.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase())
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
  };

  const clearFilters = () => {
    setFilters({ genre: "", year: "" });
    setSearchQuery("");
    setFilteredBooks(books);
  };

  const toggleLayout = () => {
    setLayout(layout === "grid" ? "list" : "grid");
  };

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate("/user-profile");
    } else {
      navigate("/login");
    }
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

        {/* Профіль */}
        <div
          onClick={handleProfileClick}
          style={{
            marginLeft: "auto",
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
            userSelect: "none",
            boxShadow: "0 4px 8px rgba(79, 70, 229, 0.6)",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#4338ca")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#4f46e5")
          }
          title={isLoggedIn ? "Профіль" : "Увійти в акаунт"}
          aria-label="Profile"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleProfileClick();
          }}
        >
          👤
        </div>
      </header>

      <div className="controls">
        <SearchBar onSearch={handleSearch} />
        <FilterOptions onFilterChange={handleFilterChange} />
      </div>

      <BooksList books={filteredBooks} layout={layout} />
    </div>
  );
}

export default App;
