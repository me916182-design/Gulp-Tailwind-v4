/**
 * Main JS - Точка входа
 */

import { init as initMobileMenu } from './mobile-menu.js';
import { init as initModal } from './modal.js';

initMobileMenu();
initModal();

console.log('Main JS loaded');
