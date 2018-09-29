import { Game } from './game';
import { WebSocketClient } from './web-socket/web-socket-client';

window.addEventListener('load', async () => {
    try {
        const context = document.querySelector('canvas').getContext('2d');
        const webSocketClient = new WebSocketClient('http://localhost:8081');    
        await webSocketClient.connect();
        const game = new Game(context, webSocketClient);
        game.run();
    } catch (error) {
        alert(error.message);
    }
});