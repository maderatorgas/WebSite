import axios from "axios";

const API = "http://localhost:8000"; // заміни на свій бекенд

// Глобальна настройка axios для відправки cookie
axios.defaults.withCredentials = true;

// РЕЄСТРАЦІЯ
export const registerUser = async ({ username, email, password }) => {
  return await axios.post(`${API}/users/register/`, { username, email, password });
};

// СКИДАННЯ ПАРОЛЯ
export const resetPassword = async (email) => {
  return await axios.post(`${API}/users/password-reset/`, { email });
};

export const confirmPasswordReset = async (uuid, token, newPassword) => {
  return await axios.post(`${API}/users/password-reset-confirm/${uuid}/${token}`, {
    password: newPassword,
  });
};

// ВИДАЛЕННЯ АККАУНТУ
export const deleteAccountRequest = async (email) => {
  return await axios.post(`${API}/users/delete-account/`, { email });
};

export const confirmAccountDeletion = async (uuid, token) => {
  return await axios.get(`${API}/users/delete-account-confirm/${uuid}/${token}`);
};

// ОТРИМАННЯ ДАНИХ КОРИСТУВАЧА (авторизація через cookie автоматична)
export const getCurrentUser = async () => {
  return await axios.get(`${API}/users/`);
};

export const updateCurrentUser = async (updatedData) => {
  return await axios.put(`${API}/users/`, updatedData);
};

// Адмінські методи — теж без ручного додавання заголовків
export const getUserById = async (userId) => {
  return await axios.get(`${API}/users/${userId}`);
};

export const updateUser = async (userId, updatedData) => {
  return await axios.put(`${API}/users/${userId}`, updatedData);
};

export const deleteUser = async (userId) => {
  return await axios.delete(`${API}/users/${userId}`);
};

// КНИГИ — доступні всім, авторизація не потрібна
export const getBooks = async () => {
  return await axios.get(`${API}/books/`);
};

export const getBookById = async (bookId) => {
  return await axios.get(`${API}/books/${bookId}`);
};

export const addBook = async (bookData) => {
  return await axios.post(`${API}/books/`, bookData);
};

export const updateBook = async (bookId, updatedData) => {
  return await axios.put(`${API}/books/${bookId}`, updatedData);
};

export const deleteBook = async (bookId) => {
  return await axios.delete(`${API}/books/${bookId}`);
};
