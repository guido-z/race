import { Game } from './game';
import * as io from "socket.io-client";

window.addEventListener('load', () => {
    const socket = io('http://localhost:8081');
    const context = document.querySelector('canvas').getContext('2d');
    const game = new Game(context);
    game.run();
});