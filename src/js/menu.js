export default () => {
    bindSwitchMenuButton();
}

function bindSwitchMenuButton() {
    const openMenuBtn = document.getElementById('hamburgerMenuOpen');
    const closeMenuBtn = document.getElementById('menuCloseBtn');
    const menu = document.getElementById('menu');
    const body = document.querySelector('body');

    openMenuBtn.addEventListener('click', () => {
        openMenuBtn.classList.add('menu-open_hide')
        menu.classList.add('menu_open');
    })
    closeMenuBtn.addEventListener('click', () => {
        openMenuBtn.classList.remove('menu-open_hide')
        menu.classList.remove('menu_open');
    })
}
