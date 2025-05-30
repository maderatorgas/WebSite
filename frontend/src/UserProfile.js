// src/UserProfile.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "./api";

const UserProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


   useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getCurrentUser(); // ✨ ОНОВЛЕНО
        setUserData(response.data); // ✨ ОНОВЛЕНО
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userName", response.data.name); // збережи ім’я, якщо потрібно
      } catch (err) {
        console.error("Помилка при завантаженні профілю:", err);
        setError("Не вдалося завантажити дані профілю");
        localStorage.removeItem("isLoggedIn");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

   const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate("/");
  };

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="user-profile">
      <div className="profile-header">
        <img
          src={userData.avatarUrl || "/avatar.jpg"}
          alt="Аватар користувача"
          className="avatar"
        />
        <h2>{userData.name || "Користувач"}</h2>
        <p className="email">{userData.email}</p>
        <p className="joined">
          Дата реєстрації:{" "}
          {new Date(userData.registrationDate).toLocaleDateString()}
        </p>
      </div>

      <div className="profile-actions" style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <button onClick={handleGoHome} className="auth-button">На головну</button>
        <button onClick={handleLogout} className="auth-button">Вийти з акаунту</button>
      </div>
    </div>
  );
};

export default UserProfile;