export interface WebSocketMessage {
    event: string;
    playerId?: number;
    payload: any;
}