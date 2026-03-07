/**
 * Мобильное меню — логика работы
 */

export function init() {
  const menu = document.getElementById('mobile-menu');
  const menuPanel = menu?.querySelector('.mobile-menu-panel');
  const openBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-menu-close');
  const menuLinks = menu?.querySelectorAll('.mobile-menu-link');

  if (!menu || !menuPanel || !openBtn) return;

  // Проверка, открыто ли меню
  const isOpen = () => !menu.classList.contains('hidden');

  // Открытие меню
  const openMenu = () => {
    document.body.classList.add('open-menu');
    menu.classList.remove('hidden');
    setTimeout(() => {
      menuPanel.classList.remove('translate-x-full');
    }, 10);
    document.body.style.overflow = 'hidden';
  };

  // Закрытие меню
  const closeMenu = () => {
    document.body.classList.remove('open-menu');
    menuPanel.classList.add('translate-x-full');
    setTimeout(() => {
      menu.classList.add('hidden');
      document.body.style.overflow = '';
    }, 300);
  };

  // Тоггл меню по клику на кнопку
  openBtn.addEventListener('click', () => {
    if (isOpen()) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  closeBtn?.addEventListener('click', closeMenu);

  // Закрытие по клику на подложку (затемнение)
  const overlay = menu.querySelector('.mobile-menu-overlay');
  overlay?.addEventListener('click', closeMenu);

  // Закрытие по клику вне панели
  menu.addEventListener('click', (e) => {
    if (e.target === menu) {
      closeMenu();
    }
  });

  // Закрытие по клику на ссылку
  menuLinks?.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Закрытие по Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.classList.contains('hidden')) {
      closeMenu();
    }
  });
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', init);
