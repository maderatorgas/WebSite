# WebSite
For Hackatoon

# Frontend
Вебінтерфейс для перегляду, фільтрації, пошуку та управління книжками з авторизацією, відновленням паролю та особистим кабінетом користувача.
# Можливості
Реєстрація, вхід та відновлення паролю (JWT)
Пошук та фільтрація книг за жанром
Перегляд детальної інформації про книги
Сторінка користувача
# Технології використані в проекті
React 1
React Router v7
Axios — для запитів до бекенду
JWT авторизація
CSS/SCSS — для стилів
# Структура frontend
frontend/
├──public/
|   ├── avatar.jpg
|   ├── favicon.ico
|   ├── index.html
|   ├── manifest.json
|   └── robots.txt
├──src/
|   ├── components/
|   ├── api.js
|   ├── App.js
|   ├── BookCard.js
|   ├── BooksList.js
|   ├── FilterOptions.js
|   ├── Login.jsx
|   ├── UserProfile.js
|   ├── ResetPasswordPage.js
|   ├── SearchBar.js
|   ├── index.js
|   └── index.css
├── dockerfile
├── .gitignore
├── package.json
├── package-lock.json
└── README.md


#Структура backend

backend/
├── Dockerfile                  # Докерфайл для контейнеризації: python 3.13, встановлення залежностей, копіювання коду
├── manage.py                   # Стандартний CLI файл Django для управління командою (runserver, migrate тощо)
├── requirements.txt            # Список python-залежностей (Django, DRF, SimpleJWT, psycopg2 і інші)

├── backend/
│   ├── __init__.py             # Ініціалізація пакету
│   ├── asgi.py                 # ASGI-конфіг для асинхронного сервера
│   ├── settings.py             # Основні налаштування Django (не наданий)
│   ├── urls.py                 # Кореневі URL: імпортує роутинг apps books і users (передбачається)
│   ├── wsgi.py                 # WSGI-конфіг для синхронного сервера

├── books/                      # Додаток Books — управління книгами та жанрами
│   ├── __init__.py             # Ініціалізація пакету
│   ├── apps.py                 # Клас BooksConfig для налаштувань додатку
│   ├── models.py               # Моделі:Genre, Books
│   ├── serializers.py          # Серіалізатори для Books і Genre (з полем genre як назва)
│   ├── urls.py                 # Роутинг: CRUD книги (список, деталі), жанри (список, деталі)
│   ├── views.py                # Представлення (views):права доступу, список/CRUD книг із пошуком і сортуванням, CRUD жанрів
├── users/                      # Додаток Users — кастомна авторизація та акаунти
│   ├── __init__.py             # Ініціалізація пакету
│   ├── apps.py                 # Клас UsersConfig
│   ├── models.py               # Кастомна модель User (успадковує AbstractUser), UUID primary key
│   ├── serializers.py          # Серіалізатори:базові поля, творення, з валідацією пароля, email для скидання/видалення, кастом JWT із аутентифікацією через email
│   ├── tokens.py               # Генератор токенів для підтверджень (видалення акаунту)
│   ├── urls.py                 # Роутинг:список і створення користувачів, деталі користувача, реєстрація, запит скидання пароля, підтвердження скидання пароля, запит видалення акаунту, підтвердження видалення, JWT токени
│   ├── views.py                # Представлення:CRUD користувачів, реєстрація з email-підтвердженням, скидання пароля через email + токен, видалення акаунту з підтвердженням, кастомний вхід з JWT


#Структура DevOps

backend/                          
│
├── dockerfile                   # Docker-інструкція для збирання образу:
│                                # Використовує базовий образ python:3.13
│                                # Встановлює залежності з requirements.txt
│                                # Копіює весь код у контейнер
│
├── requirements.txt             #Список залежностей Python
│                                #Використовується в dockerfile для встановлення бібліотек
│
├── manage.py                    #Django-скрипт для управління проєктом:
│                                #Використовується при запуску міграцій, запуску сервера, тощо
│                                #Часто викликається з docker-контейнера: `docker exec`
│
├── backend/                     
│   └── wsgi.py                  # WSGI-точка входу, використовується при розгортанні з Gunicorn/Uvicorn
├── books/                       
│   └── ...
├── users/                       
│   └── ...   
