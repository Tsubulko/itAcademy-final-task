const game = document.querySelector('.game');
const profile = document.querySelector('.profile');
const authorization = document.querySelector('.authorization');
const navItems = document.querySelectorAll('.navItemBtn');

function hideAll() {
    game.classList.add('hidden');
    profile.classList.add('hidden');
    // authorization.classList.add('hidden');
}

function showBlock(block) {
    hideAll();
    block.classList.remove('hidden');
}

hideAll();

navItems[0].addEventListener('click', () => showBlock(game));
navItems[1].addEventListener('click', () => showBlock(profile));