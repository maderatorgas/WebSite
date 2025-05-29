// src/UserProfile.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Імпортуємо потрібні функції з api.js
import { getUserById } from "./api"; // шлях може відрізнятись, якщо файл в іншій папці

const UserProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Припустимо, що ID користувача зберігається в localStorage після логіну
  const userId = localStorage.getItem("userId"); // або використай auth token, залежно від твоєї логіки

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) {
        setError("Користувач не авторизований");
        setLoading(false);
        return;
      }

      try {
        const data = await getUserById(userId); // виклик API
        setUserData(data);
      } catch (err) {
        console.error("Помилка при завантаженні профілю:", err);
        setError("Не вдалося завантажити дані профілю");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId"); // також видаляємо ID
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
          src={userData.avatarUrl || "/avatar.jpg"} // якщо немає аватара — стандартний
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
        <button onClick={handleGoHome} className="auth-button">
          На головну
        </button>
        <button onClick={handleLogout} className="auth-button">
          Вийти з акаунту
        </button>
      </div>
    </div>
  );
};

export default UserProfile;