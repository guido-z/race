const io = require('socket.io')();
const manager = require('./web-socket/web-socket-manager')(io);

const server = io.listen(8081);

io.on('connection', client => {
    io.to(client.conn.id).emit('requestName');
    
    client.on('sendName', ([{ payload: { name } }]) => {        
        manager.addClient(client.conn.id, name);
        manager.emit('playerJoin', { name });
    });

    client.on('disconnect', () => {
        manager.removeClient(client.conn.id);
    });
});