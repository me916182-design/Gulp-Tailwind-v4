# Gulp-сборка с Tailwind CSS v4

Современная Gulp-сборка с Tailwind CSS v4, модульными HTML-шаблонами и готовыми компонентами.

## 🚀 Технологии

- **Gulp 5** — система сборки
- **Tailwind CSS v4** — утилитарные стили (нативный CSS-синтаксис)
- **PostCSS** — обработка CSS
- **BrowserSync** — локальный сервер с автообновлением
- **ESLint + Prettier** — линтинг и форматирование кода

## 📦 Установка

```bash
npm install
```

## 🛠 Команды

| Команда              | Описание                                      |
| -------------------- | --------------------------------------------- |
| `npm run dev`        | Запуск dev-сервера, watch-режим               |
| `npm run build`      | Сборка проекта в `dist/`                      |
| `npm run build:prod` | Продакшн-сборка (минификация, без sourcemaps) |
| `npm run clean`      | Очистка директории `dist/`                    |
| `npm run lint`       | Проверка JS файлов через ESLint               |
| `npm run lint:fix`   | Исправление ESLint-ошибок                     |
| `npm run format`     | Форматирование кода через Prettier            |

## 📁 Структура проекта

```
project/
├── src/
│   ├── html/
│   │   ├── pages/          # HTML-страницы (точка входа)
│   │   │   ├── index.html
│   │   │   └── handbook.html
│   │   └── partials/       # Переиспользуемые компоненты
│   │       ├── header.html
│   │       └── footer.html
│   ├── images/             # Изображения
│   ├── fonts/              # Шрифты (woff2, woff, ttf)
│   ├── js/
│   │   ├── main.js         # Точка входа JS
│   │   ├── modal.js        # Модальные окна
│   │   └── mobile-menu.js  # Мобильное меню
│   ├── ibs/                # Библиотеки (копируются как есть)
│   └── main.css            # Точка входа CSS (Tailwind + стили)
├── dist/                   # Результат сборки
├── gulpfile.js             # Конфигурация Gulp
├── tailwind.config.js      # Настройки Tailwind CSS
└── package.json
```

## 🎨 Стилизация

### Tailwind CSS v4

Используется нативный CSS-синтаксис Tailwind v4:

```css
@import 'tailwindcss';

@theme {
  --color-brand: #3b82f6;
  --font-sans: 'Helvetica Neue', Arial, sans-serif;
}
```

### Кастомные компоненты

В `main.css` определены готовые классы:

| Класс           | Описание                          |
| --------------- | --------------------------------- |
| `.btn-primary`  | Основная кнопка                   |
| `.btn-secondary`| Вторичная кнопка                  |
| `.card`         | Карточка с тенью и отступами      |
| `.grid-auto-fit`| Адаптивная сетка (auto-fill)      |
| `.container-custom` | Контейнер с адаптивной шириной |
| `.text-truncate`| Обрезка текста с многоточием      |
| `.flex-center`  | Центрирование flex-элементов      |

## 🧩 Модульность HTML

Используется `gulp-file-include` для подключения частей:

```html
<!-- src/html/pages/index.html -->
@@include('../partials/header.html')

<main>
  <h1>Добро пожаловать</h1>
</main>

@@include('../partials/footer.html')
```

## 🪟 Модальные окна

В сборку встроена система модальных окон с поддержкой нескольких окон одновременно.

### Использование

```html
<!-- Кнопка открытия -->
<button data-modal-open="login">Войти</button>

<!-- Модальное окно -->
<div id="modal-login" data-modal="login" class="modal fixed inset-0 z-50 hidden">
  <div class="modal-overlay absolute inset-0 bg-black/50"></div>
  <div class="modal-container flex min-h-full items-center justify-center p-4">
    <div class="modal-content relative w-full max-w-lg bg-white p-6">
      <button data-modal-close aria-label="Закрыть">✕</button>
      <!-- Контент -->
    </div>
  </div>
</div>
```

### Атрибуты

| Атрибут | Описание |
| ------- | -------- |
| `data-modal-open="name"` | Кнопка открытия окна с именем `name` |
| `data-modal="name"` | Разметка окна с именем `name` |
| `id="modal-name"` | ID окна (рекомендуется `modal-{name}`) |
| `data-modal-close` | Кнопка закрытия (закрывает последнее открытое) |

### Особенности

- Поддержка стека окон (можно открыть несколько)
- Закрытие по клику на overlay, кнопке `data-modal-close` или клавише Escape
- Анимация появления/исчезновения (300ms)
- Блокировка прокрутки body при открытом окне

## 📦 Зависимости

### Dev-зависимости

- `gulp` ^5.0.1
- `tailwindcss` ^4.2.1
- `@tailwindcss/postcss` ^4.2.1
- `browser-sync` ^3.0.4
- `gulp-sass`, `gulp-postcss`, `gulp-terser`
- `eslint` ^9.37.0
- `prettier` ^3.6.2

### Продакшн-зависимости

- `@fancyapps/ui` — Fancybox (опционально)

## 🎯 Особенности сборки

- **Dev-режим**: sourcemaps, автообновление браузера, без минификации
- **Prod-режим**: минификация CSS/JS, оптимизация изображений, без sourcemaps
- **Кэширование**: `gulp-newer` для ускорения повторных сборок
- **Адаптивность**: mobile-first брейкпоинты (sm, md, lg, xl, 2xl)

## 🔗 Быстрый старт

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev

# Сборка для продакшена
npm run build:prod
```

Dev-сервер запустится на `http://localhost:3000` (порт может отличаться).

## 📝 Лицензия

Private
