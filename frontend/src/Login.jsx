import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true; // дозволити cookies для всіх запитів

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !username) {
      alert("Будь ласка, заповніть усі поля");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8000/users/register/",
        { username, email, password },
        { withCredentials: true }
      );

      alert("Успішна реєстрація!");
      navigate("/");
    } catch (error) {
      console.error("Помилка реєстрації:", error);
      alert("Помилка реєстрації. Спробуйте ще раз.");
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Будь ласка, введіть email та пароль");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8000/users/login/",
        { email, password },
        { withCredentials: true }
      );

      alert("Успішний вхід!");
      navigate("/");
    } catch (error) {
      console.error("Помилка входу:", error);
      alert("Невірний email або пароль");
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Введіть email");
      return;
    }

    try {
      await axios.post("http://localhost:8000/users/password-reset/", { email });
      alert("Інструкції надіслано на email");
      setIsResetting(false);
    } catch (error) {
      alert("Не вдалося надіслати email");
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-container">
        {!isRegistering && !isResetting && (
          <>
            <h2>Вхід в акаунт</h2>
            <form onSubmit={handleLoginSubmit} className="auth-form">
              <div className="input-group">
                <label htmlFor="login-email">Email:</label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  placeholder="Введіть email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="login-password">Пароль:</label>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  placeholder="Введіть пароль"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">Увійти</button>
            </form>

            <div className="auth-options">
              <button type="button" onClick={() => setIsRegistering(true)} className="btn btn-link">
                Реєстрація
              </button>
              <button type="button" onClick={() => setIsResetting(true)} className="btn btn-link">
                Відновити пароль
              </button>
            </div>
          </>
        )}

        {isRegistering && (
          <>
            <h2>Реєстрація</h2>
            <form onSubmit={handleRegisterSubmit} className="auth-form">
              <div className="input-group">
                <label htmlFor="register-email">Email:</label>
                <input
                  id="register-email"
                  type="email"
                  value={email}
                  placeholder="Введіть email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="register-username">Ім'я користувача:</label>
                <input
                  id="register-username"
                  type="text"
                  value={username}
                  placeholder="Введіть ім'я"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="register-password">Пароль:</label>
                <input
                  id="register-password"
                  type="password"
                  value={password}
                  placeholder="Введіть пароль"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">Зареєструватись</button>
            </form>

            <button
              type="button"
              onClick={() => setIsRegistering(false)}
              className="btn btn-secondary form-navigation-back"
            >
              Назад до входу
            </button>
          </>
        )}

        {isResetting && (
          <>
            <h2>Відновлення паролю</h2>
            <form onSubmit={handlePasswordReset} className="auth-form">
              <div className="input-group">
                <label htmlFor="reset-email">Email:</label>
                <input
                  id="reset-email"
                  type="email"
                  value={email}
                  placeholder="Введіть email для відновлення"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Підтвердити</button>
            </form>

            <button
              type="button"
              onClick={() => setIsResetting(false)}
              className="btn btn-secondary form-navigation-back"
            >
              Назад до входу
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
