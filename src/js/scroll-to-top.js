/**
 * Кнопка "Наверх"
 *
 * Показывается при прокрутке вниз, скрывается наверху.
 * Клик плавно прокручивает страницу к началу.
 */

export function init() {
  const button = document.getElementById('scroll-to-top');
  if (!button) return;

  const showThreshold = 300; // Показывать после 300px прокрутки

  // Обработчик прокрутки
  const handleScroll = () => {
    if (window.scrollY > showThreshold) {
      button.classList.remove('opacity-0', 'invisible');
      button.style.transform = 'translateY(0)';
    } else {
      button.classList.add('opacity-0', 'invisible');
      button.style.transform = 'translateY(20px)';
    }
  };

  // Клик по кнопке
  const handleClick = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Слушатели
  window.addEventListener('scroll', handleScroll, { passive: true });
  button.addEventListener('click', handleClick);

  // Проверка при загрузке
  handleScroll();
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', init);
