// src/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Фейкова перевірка логіна
    if (email && password) {
      // Тут можна встановити стан авторизації через Context або Redux
      alert("Успішний вхід!");
      navigate("/user-profile");
    } else {
      alert("Будь ласка, введіть email та пароль");
    }
  };

  return (
    <div className="login-container">
      <h2>Вхід в акаунт</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            placeholder="Введіть email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Пароль:
          <input
            type="password"
            value={password}
            placeholder="Введіть пароль"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button type="submit">Увійти</button>
      </form>
    </div>
  );
};

export default Login;
