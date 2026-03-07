/**
 * Плавная прокрутка к якорям
 *
 * Использование:
 * - Добавить data-scroll на контейнер: <nav data-scroll>
 * - Все ссылки с href="#..." внутри будут прокручиваться плавно
 * - Опционально: data-scroll-offset="80" на контейнере для отступа сверху
 */

export function init() {
  // Обработчик кликов по ссылкам внутри контейнеров с data-scroll
  document.addEventListener('click', (e) => {
    // Проверяем, находится ли ссылка внутри контейнера с data-scroll
    const link = e.target.closest('[data-scroll] a[href^="#"]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    const targetId = href.slice(1);
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    e.preventDefault();

    // Находим ближайший контейнер с data-scroll для получения offset
    const scrollContainer = link.closest('[data-scroll]');
    const offset = scrollContainer
      ? parseInt(scrollContainer.getAttribute('data-scroll-offset'), 10) || 0
      : 0;

    // Вычисляем позицию с учётом отступа
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    // Плавная прокрутка
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });

    // Не обновляем URL — хеш остаётся неизменным
  });
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', init);
