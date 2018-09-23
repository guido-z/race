import * as io from "socket.io-client"

export class WebSocketClient {

    private socket: SocketIOClient.Socket;

    constructor(uri: string) {
        this.socket = io(uri);
        this.socket.on('connect_error', () => {
            throw new Error('Could not connect to server.');
        });
    }

}