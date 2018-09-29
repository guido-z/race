const io = require('socket.io')();

const server = io.listen(8081);

io.on('connection', client => {
    io.to(client.conn.id).emit('requestName');
    
    client.on('sendName', ([message]) => {        
    });
});