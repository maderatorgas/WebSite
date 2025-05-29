import axios from "axios";

const API = "http://localhost:8000"; // заміни на свій бекенд

// ---------- Допоміжна функція для отримання токена ----------
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

// ---------- РЕЄСТРАЦІЯ ----------
export const registerUser = async ({ username, email, password }) => {
  return await axios.post(`${API}/users/register/`, { username, email, password });
};

// ---------- СКИДАННЯ ПАРОЛЯ ----------
export const resetPassword = async (email) => {
  return await axios.post(`${API}/users/password-reset/`, { email });
};

export const confirmPasswordReset = async (uuid, token, newPassword) => {
  return await axios.post(`${API}/users/password-reset-comfirm/${uuid}/${token}`, {
    password: newPassword,
  });
};

// ---------- ВИДАЛЕННЯ АККАУНТУ ----------
export const deleteAccountRequest = async (email) => {
  return await axios.post(`${API}/users/delete-account/`, { email });
};

export const confirmAccountDeletion = async (uuid, token) => {
  return await axios.get(`${API}/users/delete-account-confirm/${uuid}/${token}`);
};


// 🛠 GET /users/me — наприклад, для отримання даних себе
export const getCurrentUser = async () => {
  return await axios.get(`${API}/users/`, getAuthHeader());
};

// 🛠 PUT /users/me — оновити свої дані
export const updateCurrentUser = async (updatedData) => {
  return await axios.put(`${API}/users/`, updatedData, getAuthHeader());
};

// 📋 GET /users/<id> — доступно лише адміну
export const getUserById = async (userId) => {
  return await axios.get(`${API}/users/${userId}`, getAuthHeader());
};

// 🛠 PUT /users/<id> — лише адмін
export const updateUser = async (userId, updatedData) => {
  return await axios.put(`${API}/users/${userId}`, updatedData, getAuthHeader());
};

// 🗑️ DELETE /users/<id> — лише адмін
export const deleteUser = async (userId) => {
  return await axios.delete(`${API}/users/${userId}`, getAuthHeader());
};

// ---------- КНИГИ ----------
// 📚 GET books/ — доступно всім
export const getBooks = async () => {
  return await axios.get(`${API}/books/`);
};

// 📖 GET books/{id} — доступно всім
export const getBookById = async (bookId) => {
  return await axios.get(`${API}/books/${bookId}`);
};

// ✏️ POST books/ — лише адмін
export const addBook = async (bookData) => {
  return await axios.post(`${API}/books/`, bookData, getAuthHeader());
};

// 🛠 PUT books/{id} — лише адмін
export const updateBook = async (bookId, updatedData) => {
  return await axios.put(`${API}/books/${bookId}`, updatedData, getAuthHeader());
};

// 🗑️ DELETE books/{id} — лише адмін
export const deleteBook = async (bookId) => {
  return await axios.delete(`${API}/books/${bookId}`, getAuthHeader());
};