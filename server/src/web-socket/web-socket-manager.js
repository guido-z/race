module.exports = function (io) {
    const io = io;
    const clients = new Map();

    const addClient = function (id, name) {
        clients.set(id, name);
    };

    const removeClient = function (id) {
        clients.delete(id);
    };

    const emit = function (message) {
        io.emit(message);
    }

    const emitToSingleClient = function (message, client) {
        const dest = clients.get(client.conn.id);
        if (dest) {
            this.io.clients[dest.id].send(message);
        }
    }

    return {
        addClient: addClient,
        removeClient: removeClient,
        emit: emit,
        emitToSingleClient: emitToSingleClient
    };
};