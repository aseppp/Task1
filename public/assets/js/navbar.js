const openMenu = document.getElementById('navOpen');
const menu = document.getElementById('navMenu');
const closeMenu = document.getElementById('closeMenu');

openMenu.addEventListener('click', show);
function show() {
    openMenu.classList.toggle('active')
    menu.classList.toggle('active')
}

closeMenu.addEventListener('click', hide);
function hide() {
    openMenu.classList.remove('active')
    menu.classList.remove('active')
}