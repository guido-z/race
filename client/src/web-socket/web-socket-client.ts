import * as io from "socket.io-client"
import { WebSocketMessage } from "./web-socket-message";

export class WebSocketClient {

    private socket: SocketIOClient.Socket;

    constructor(private uri: string) {}

    connect(): Promise<void> {
        return new Promise((resolve: any, reject: any) => {
            this.socket = io(this.uri);
            this.socket.on('connect', resolve);
            this.socket.on('connect_error', reject);
        });
    }

    emit(message: WebSocketMessage) {
        const { event, playerId, payload } = message;
        this.socket.emit(event, [{ playerId, payload }]);
    }

    onMessage(message: string, callback: (message: any) => void) {
        this.socket.on(message, callback);
    }
}