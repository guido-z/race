import { Game } from './game';

window.addEventListener('load', () => {
    const context = document.querySelector('canvas').getContext('2d');
    const game = new Game(context);
    game.run();
});