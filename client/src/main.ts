import { Game } from './game';
import { WebSocketClient } from './web-socket/web-socket-client';

window.addEventListener('load', () => {
    try {
        const context = document.querySelector('canvas').getContext('2d');
        const webSocketsClient = new WebSocketClient('http://localhost:8081');        
        const game = new Game(context, webSocketsClient);
        game.run();
    } catch (error) {
        alert(error.message);
    }
});