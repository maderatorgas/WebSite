import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import AdminPanel from "./components/AdminPanel";
import Dashboard from "./components/Dashboard";
import BookManagement from "./components/BookManagement";
import UserProfile from './UserProfile';
import Login from './Login.jsx';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Головна сторінка */}
        <Route path="/" element={<App />} />

        {/* Авторизація */}
        <Route path="/login" element={<Login />} />
        <Route path="/user-profile" element={<UserProfile />} />

        {/* Адмін панель */}
        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<AdminPanel />}>
            <Route index element={<Dashboard />} />
            <Route path="books" element={<BookManagement />} />
          </Route>
        </Route>

        {/* Якщо маршрут не знайдено */}
        <Route path="*" element={<h1>Сторінка не знайдена</h1>} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();