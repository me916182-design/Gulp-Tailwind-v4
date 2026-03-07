/**
 * Модальное окно — логика работы
 *
 * Использование:
 * - Открыть: <button data-modal-open>
 * - Закрыть: <button data-modal-close> или клик вне контента
 */

function init() {
  const modal = document.getElementById('modal');
  const modalOverlay = modal?.querySelector('.modal-overlay');
  const modalContent = modal?.querySelector('.modal-content');

  if (!modal || !modalOverlay || !modalContent) return;

  // Открытие модального окна
  const openModal = () => {
    document.body.classList.add('modal-open');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Анимация появления
    requestAnimationFrame(() => {
      modalOverlay.classList.remove('opacity-0');
      modalContent.classList.remove('opacity-0', 'scale-95');
      modalContent.classList.add('opacity-100', 'scale-100');
    });
  };

  // Закрытие модального окна
  const closeModal = () => {
    document.body.classList.remove('modal-open');
    modalOverlay.classList.add('opacity-0');
    modalContent.classList.remove('opacity-100', 'scale-100');
    modalContent.classList.add('opacity-0', 'scale-95');

    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }, 300);
  };

  // Обработчик открытия по data-modal-open
  document.addEventListener('click', (e) => {
    const openBtn = e.target.closest('[data-modal-open]');
    if (openBtn) {
      openModal();
    }
  });

  // Обработчик закрытия по data-modal-close
  document.addEventListener('click', (e) => {
    const closeBtn = e.target.closest('[data-modal-close]');
    if (closeBtn) {
      closeModal();
    }
  });

  // Закрытие по клику вне контента (на overlay)
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target === modalOverlay) {
      closeModal();
    }
  });

  // Закрытие по Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', init);
