const io = require('socket.io')();
const manager = require('./web-socket/web-socket-manager')(io);

io.listen(8081);

io.on('connection', client => {
    client.on('sendName', ([{ payload: { name } }]) => {
        manager.addClient(client.conn.id, name);
        manager.broadcast('playerJoin', { name }, client);
    });

    client.on('requestPlayerList', () => {
        const playerList = manager.getClients();
        manager.emitToSingleClient('playerList', { players: playerList }, client);
    });
    
    client.on('disconnect', () => {
        manager.removeClient(client.conn.id);
    });
});