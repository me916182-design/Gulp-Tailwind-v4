/**
 * Main JS - Точка входа
 */

import { init as initMobileMenu } from './mobile-menu.js';
import { init as initModal } from './modal.js';
import { init as initSmoothScroll } from './smooth-scroll.js';

initMobileMenu();
initModal();
initSmoothScroll();

console.log('Main JS loaded');
