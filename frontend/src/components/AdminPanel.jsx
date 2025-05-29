// src/components/AdminPanel.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";

const AdminPanel = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Бічне меню */}
      <aside style={{ width: "200px", backgroundColor: "#f4f4f4", padding: "1rem" }}>
        <h3>Адмін-панель</h3>
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          <li><Link to="books">Книги</Link></li>
          <li><Link to="users">Користувачі</Link></li>
          <li><Link to="stats">Статистика</Link></li>
        </ul>
        <button onClick={() => window.location.href = "/"} style={{ marginTop: "1rem" }}>
          На головну
        </button>
      </aside>

      {/* Контент */}
      <main style={{ flex: 1, padding: "2rem" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;