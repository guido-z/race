module.exports = function (io) {
    const _io = io;
    const clients = new Map();

    const addClient = function (id, name) {
        clients.set(id, name);
    };

    const getClients = function () {
        return Array.from(clients.values());
    }

    const removeClient = function (id) {
        clients.delete(id);
    };

    const emit = function (message, payload) {
        _io.emit(message, payload);
    }

    const emitToSingleClient = function (message, payload, client) {
        _io.sockets.to(client.conn.id).emit(message, payload);
    }

    const broadcast = function (message, payload, client) {
        client.broadcast.emit(message, payload);
    }

    return {
        addClient: addClient,
        getClients: getClients,
        removeClient: removeClient,
        emit: emit,
        emitToSingleClient: emitToSingleClient,
        broadcast: broadcast
    };
};