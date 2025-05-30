import React, { useState } from 'react';
import axios from 'axios';
import './index.css';



function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Отримуємо uid та token з query-параметрів
  const queryParams = new URLSearchParams(window.location.search);
  const uid = queryParams.get('uid');
  const token = queryParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('api/users/password-reset-confirm/', {
        uid: uid,
        token: token,
        password: newPassword,
      });

      setMessage('Пароль успішно змінено');
      setError('');
    } catch (err) {
      setError('Помилка: ' + (err.response?.data?.detail || 'невідомо'));
      setMessage('');
    }
  };

  return (
    <div className="reset-password">
      <h2>Скидання пароля</h2>
      <form onSubmit={handleSubmit}>
        <label>Новий пароль:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Змінити пароль</button>
      </form>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default ResetPasswordPage;