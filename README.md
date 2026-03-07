# Gulp-сборка с Tailwind CSS v4

Gulp-сборка с Tailwind CSS v4, HTML includes и модульной архитектурой.

## 🚀 Технологии

- **Gulp 5** — система сборки
- **Tailwind CSS v4** — утилитарные стили
- **PostCSS** — обработка CSS
- **BrowserSync** — локальный сервер с автообновлением
- **ESLint + Prettier** — линтинг и форматирование кода

## 📦 Установка

```bash
npm install
```

## 🛠 Команды

| Команда                | Описание                                      |
| ---------------------- | --------------------------------------------- |
| `npm run dev`          | Запуск dev-сервера, watch-режим               |
| `npm run build`        | Сборка проекта в `dist/`                      |
| `npm run build:prod`   | Продакшн-сборка (минификация, без sourcemaps) |
| `npm run clean`        | Очистка директории `dist/`                    |
| `npm run lint`         | Проверка JS файлов через ESLint               |
| `npm run lint:fix`     | Исправление ESLint-ошибок                     |
| `npm run format`       | Форматирование кода через Prettier            |
| `npm run format:check` | Проверка форматирования                       |

## 📁 Структура проекта

```
project/
├── src/
│   ├── html/
│   │   ├── pages/          # HTML-страницы (точка входа)
│   │   │   └── index.html
│   │   └── partials/       # Переиспользуемые компоненты
│   │       ├── header.html
│   │       └── footer.html
│   ├── images/             # Изображения (копируются в dist)
│   ├── fonts/              # Шрифты (woff2, woff, ttf)
│   ├── js/
│   │   └── main.js         # Основной JS-файл
│   ├── ibs/                # Дополнительные файлы (копируются как есть)
│   └── main.css            # Точка входа CSS (Tailwind + кастомные стили)
├── dist/                   # Результат сборки
├── gulpfile.js             # Конфигурация Gulp
├── tailwind.config.js      # Настройки Tailwind CSS
├── .eslintrc.cjs           # Конфигурация ESLint
├── .prettierrc.json        # Конфигурация Prettier
└── package.json
```

## 🎨 Стилизация

### Tailwind CSS v4

В проекте используется Tailwind CSS v4 с нативным CSS-синтаксисом:

```css
@import 'tailwindcss';

@theme {
  --color-primary: #3b82f6;
  --font-sans: 'Helvetica Neue', Arial, sans-serif;
}

@layer base {
  body {
    @apply bg-gray-50 text-gray-900;
  }
}

@layer components {
  .btn {
    @apply px-6 py-3 rounded-lg font-semibold;
  }
}
```

### Кастомные темы

В `main.css` настроены:

- Цветовая палитра (blue, gray, white, black)
- Шрифты (Helvetica Neue, Courier New)
- Размеры шрифтов (xs–4xl)
- Отступы, радиусы, тени
- Базовые стили и компоненты

## 🧩 HTML Includes

Используется плагин `gulp-file-include` для модульности:

```html
<!-- src/html/pages/index.html -->
@@include('../partials/header.html')

<main class="container-custom">
  <h1>Добро пожаловать</h1>
</main>

@@include('../partials/footer.html')
```

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

- `@fancyapps/ui` ^6.0.34 (Fancybox)

## 🎯 Особенности сборки

- **Dev-режим**: sourcemaps, автообновление браузера, без минификации
- **Prod-режим**: минификация CSS/JS, оптимизация изображений, без sourcemaps
- **Кэширование**: `gulp-newer` для ускорения повторных сборок
- **7-1 архитектура**: модульная структура SCSS/CSS

## 📝 Лицензия

Private

# Gulp-Tailwind-v4
