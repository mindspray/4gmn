import './styles.css';

import { loadHome } from './home.js'
import { createTabNav } from './tabs.js';

let content = document.createElement('div');
content.id = 'content';
document.body.append(content);

createTabNav();
loadHome();

const homeTab = document.querySelector('.home');
// const menuTab = document.getElementById('menu-tab');
// const contactTab = document.getElementById('contact-tab');

homeTab.addEventListener('click', loadHome);
// menuTab.addEventListener('click', loadMenu);
// contactTab.addEventListener('click', loadContact);