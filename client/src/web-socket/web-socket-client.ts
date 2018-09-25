import * as io from "socket.io-client"
import { WebSocketMessage } from "./web-socket-message";

export class WebSocketClient {

    private socket: SocketIOClient.Socket;

    constructor(uri: string) {
        this.socket = io(uri);
        this.socket.on('connect_error', () => {
            throw new Error('Could not connect to server.');
        });
    }

    emit(message: WebSocketMessage) {
        const { event, playerId, payload } = message;
        this.socket.emit(event, [{ playerId, payload }]);
    }

}