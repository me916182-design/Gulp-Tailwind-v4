/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}', './dist/**/*.html'],
  theme: {
    extend: {
      colors: {
        // Используем HEX/RGB вместо OKLCH для лучшей совместимости
        blue: {
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        gray: {
          100: '#f3f4f6',
          900: '#111827',
        },
        white: '#ffffff',
      },
    },
  },
  plugins: [],
};
