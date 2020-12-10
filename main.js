"use strict"

const themeSwitcher = document.querySelector('.header-theme-switcher');
const theme = document.querySelector('body')

themeSwitcher.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(theme.classList.value);
    if (theme.classList.value === 'theme-dark') {
        theme.classList.replace('theme-dark', 'theme-light');
    } else if (theme.classList.value === 'theme-light') {
        theme.classList.replace('theme-light', 'theme-dark');
    }
});