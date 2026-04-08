# Notes App

Приложение для заметок с редактором на React без сторонних UI-зависимостей.

## Возможности

- Создание, редактирование и удаление заметок
- Форматирование текста: жирный, курсив, подчёркивание, зачёркивание
- Заголовки H1/H2, списки, выравнивание
- Выбор шрифта, размера и цвета текста
- Поиск по заголовку и содержимому
- Автосохранение в `localStorage`
- Приветственная заметка при первом запуске

## Стек

- React 18
- CSS Modules
- localStorage

## Запуск

```bash
npm install
npm start
```

Открыть в браузере: `http://localhost:3000`

## Структура

```
src/
├── components/
│   ├── Sidebar.jsx          # Список заметок и поиск
│   ├── Editor.jsx           # Заголовок и тело заметки
│   ├── Toolbar.jsx          # Панель форматирования
│   └── DeleteModal.jsx      # Диалог подтверждения удаления
├── hooks/
│   └── useNotes.js          # Весь стейт и CRUD-операции
├── icons/
│   └── icons.jsx            # SVG-иконки
├── utils/
│   ├── helpers.js           # generateId, stripHtml, formatDate, createNote
│   └── storage.js           # Обёртка над localStorage
├── App.jsx
├── App.module.css
└── global.css               # CSS-переменные и reset
```

## Смена хранилища

`storage.js` — единственное место, где приложение работает с данными. Достаточно заменить реализацию `loadNotes()` и `saveNotes()`, чтобы переключиться на IndexedDB, API или любой другой бэкенд.
