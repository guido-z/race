import { WebSocketClient } from "./web-socket/web-socket-client";

export class Game {

    constructor(
        private readonly context: CanvasRenderingContext2D,
        private readonly webSocketClient: WebSocketClient
    ) {}

    run() {
        this.update();
        this.draw();
        requestAnimationFrame(this.run.bind(this));
    }

    private update() {

    }

    private draw() {

    }

}