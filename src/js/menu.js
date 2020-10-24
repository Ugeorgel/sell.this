export default () => {
    bindSwitchMenuButton();
}

function bindSwitchMenuButton() {
    const openMenuBtn = document.getElementById('hamburgerMenuOpen');
    const closeMenuBtn = document.getElementById('menuCloseBtn');
    const menu = document.getElementById('menu');

    openMenuBtn.addEventListener('click', () => {
        menu.classList.add('menu_active');
    })
    closeMenuBtn.addEventListener('click', () => {
        menu.classList.remove('menu_active');
    })
}
