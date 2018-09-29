import { WebSocketClient } from "./web-socket/web-socket-client";

export class Game {

    constructor(
        private readonly context: CanvasRenderingContext2D,
        private readonly webSocketClient: WebSocketClient
    ) {
        this.registerMessageHandlers();
    }

    run() {
        this.update();
        this.draw();
        requestAnimationFrame(this.run.bind(this));
    }

    private registerMessageHandlers() {
        this.webSocketClient.onMessage('requestName', message => {
            const name = prompt('Enter your name:');
            this.webSocketClient.emit({
                event: 'sendName',
                playerId: 1,
                payload: { name }
            });
        });

        this.webSocketClient.onMessage('disconnect', () => {
            alert('Disconnected from server');
        });
    }

    private update() {

    }

    private draw() {

    }

}