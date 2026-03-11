/**
 * Main JS - Точка входа
 */

import { init as initMobileMenu } from './mobile-menu.js';
import { init as initModal } from './modal.js';
import { init as initBodyScroll } from './body-scroll.js';
// import { init as initSmoothScroll } from './smooth-scroll.js';
import { init as initScrollToTop } from './scroll-to-top.js';

initMobileMenu();
initModal();
initBodyScroll();
// initSmoothScroll();
initScrollToTop();

console.log('Main JS loaded');
