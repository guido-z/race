module.exports = function (io) {
    const _io = io;
    const clients = new Map();

    const addClient = function (id, name) {
        clients.set(id, name);
    };

    const removeClient = function (id) {
        clients.delete(id);
    };

    const emit = function (message, payload) {
        _io.emit(message, payload);
    }

    const emitToSingleClient = function (message, client) {
        const dest = clients.get(client.conn.id);
        if (dest) {
            _io.clients[dest.id].send(message);
        }
    }

    return {
        addClient: addClient,
        removeClient: removeClient,
        emit: emit,
        emitToSingleClient: emitToSingleClient
    };
};