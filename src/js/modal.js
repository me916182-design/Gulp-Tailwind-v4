/**
 * Модальные окна — логика работы
 *
 * Использование:
 * - Открыть: <button data-modal-open="name">
 * - Модальное окно: <div id="modal-name" data-modal="name">
 * - Закрыть: <button data-modal-close> или клик вне контента
 */

export function init() {
  // Стек открытых модальных окон (для поддержки нескольких)
  const openModals = [];

  // Сохраняем исходную ширину скроллбара
  let scrollbarWidth = 0;

  // Вычисление ширины полосы прокрутки
  const getScrollbarWidth = () => {
    const scrollDiv = document.createElement('div');
    scrollDiv.style.cssText = 'position: absolute; left: -9999px; width: 100px; height: 100px; overflow: scroll; visibility: hidden;';
    document.body.appendChild(scrollDiv);
    const width = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return width;
  };

  // Получить модальное окно по имени
  const getModal = (name) => {
    const modal = document.getElementById(`modal-${name}`) || document.querySelector(`[data-modal="${name}"]`);
    if (!modal) return null;
    return {
      modal,
      overlay: modal.querySelector('.modal-overlay'),
      content: modal.querySelector('.modal-content'),
    };
  };

  // Открытие модального окна
  const openModal = (name) => {
    const modalData = getModal(name);
    if (!modalData || !modalData.modal) return;

    const { modal, overlay, content } = modalData;

    // Если уже открыто — не открываем повторно
    if (openModals.includes(name)) return;

    // Блокируем скролл body при первом модальном
    if (openModals.length === 0) {
      scrollbarWidth = getScrollbarWidth();
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
      // Компенсируем сдвиг контента padding-right
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = scrollbarWidth + 'px';
        // Фиксируем header/footer если есть
        const fixedElements = document.querySelectorAll('.fixed, .sticky');
        fixedElements.forEach(el => {
          el.style.paddingRight = scrollbarWidth + 'px';
        });
      }
    }

    openModals.push(name);
    modal.classList.remove('hidden');

    // Анимация появления
    requestAnimationFrame(() => {
      overlay?.classList.remove('opacity-0');
      content?.classList.remove('opacity-0', 'scale-95');
      content?.classList.add('opacity-100', 'scale-100');
    });
  };

  // Закрытие модального окна
  const closeModal = (name) => {
    const modalData = getModal(name);
    if (!modalData || !modalData.modal) return;

    const { modal, overlay, content } = modalData;

    // Анимация закрытия
    overlay?.classList.add('opacity-0');
    content?.classList.remove('opacity-100', 'scale-100');
    content?.classList.add('opacity-0', 'scale-95');

    setTimeout(() => {
      modal.classList.add('hidden');
      openModals.splice(openModals.indexOf(name), 1);

      // Возвращаем скролл, если закрыли последнее модальное
      if (openModals.length === 0) {
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        // Возвращаем padding фиксированным элементам
        const fixedElements = document.querySelectorAll('.fixed, .sticky');
        fixedElements.forEach(el => {
          el.style.paddingRight = '';
        });
      }
    }, 300);
  };

  // Закрытие последнего открытого модального окна
  const closeLastModal = () => {
    if (openModals.length > 0) {
      closeModal(openModals[openModals.length - 1]);
    }
  };

  // Обработчик открытия по data-modal-open
  document.addEventListener('click', (e) => {
    const openBtn = e.target.closest('[data-modal-open]');
    if (openBtn) {
      const modalName = openBtn.getAttribute('data-modal-open');
      if (modalName) {
        openModal(modalName);
      }
    }
  });

  // Обработчик закрытия по data-modal-close
  document.addEventListener('click', (e) => {
    const closeBtn = e.target.closest('[data-modal-close]');
    if (closeBtn) {
      closeLastModal();
    }
  });

  // Закрытие по клику вне контента (на overlay)
  document.addEventListener('click', (e) => {
    if (openModals.length === 0) return;

    const currentModalName = openModals[openModals.length - 1];
    const modalData = getModal(currentModalName);
    if (!modalData) return;

    const { modal, overlay } = modalData;
    if (e.target === modal || e.target === overlay) {
      closeLastModal();
    }
  });

  // Закрытие по Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && openModals.length > 0) {
      closeLastModal();
    }
  });
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', init);
