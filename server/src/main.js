const io = require('socket.io')();
const manager = require('./web-socket/web-socket-manager')(io);
const events = require('./constants/events');

io.listen(8081);

io.on(events.connection, client => {
    client.on(events.sendName, ([{ payload: { name } }]) => {
        manager.addClient(client.conn.id, name);
        manager.broadcast(events.playerJoin, { name }, client);
    });

    client.on(events.requestPlayerList, () => {
        const players = manager.getClients();
        manager.emitToSingleClient(events.playerList, { players }, client);
    });
    
    client.on(events.disconnect, () => {
        manager.removeClient(client.conn.id);
    });
});