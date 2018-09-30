import { WebSocketClient } from './web-socket/web-socket-client';
import { Player } from './models/player';
import { Events } from './constants/events';

export class Game {
    private players: Player[];

    constructor(
        private readonly context: CanvasRenderingContext2D,
        private readonly webSocketClient: WebSocketClient
    ) {        
        this.players = [];
        this.initialize();
    }

    run() {
        this.update();
        this.draw();
        requestAnimationFrame(this.run.bind(this));
    }

    private initialize() {        
        this.registerMessageHandlers();
        this.sendName();        
        this.webSocketClient.requestPlayerList();        
    }

    private registerMessageHandlers() {
        this.webSocketClient.onMessage(Events.disconnect, () => {
            alert('Disconnected from server');
        });

        // Retrieve active players list
        this.webSocketClient.onMessage(Events.playerList, ({ players }: { players: string[] }) => {
            this.players = this.players.concat(players.map(player => {
                return new Player(player);
            }));
        });

        // A new player has joined
        this.webSocketClient.onMessage(Events.playerJoin, ({ name }: { name: string }) => {
            this.players.push(new Player(name));
        });
    }

    private sendName() {
        const name = prompt('Enter your name:');
        this.webSocketClient.emit({ event: Events.sendName, payload: { name } });
        this.players.push(new Player(name));
    }

    private update() {

    }

    private draw() {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.players.forEach((player, i) => {
            this.context.fillText(player.name, 10, i * 30);
        });
    }

}