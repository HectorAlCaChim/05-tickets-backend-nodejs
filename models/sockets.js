const TicketList = require('../models/ticket-list');
class Sockets {

    constructor (io) {
        this.io = io;
        // crear instancia del ticcket list
        this.ticketList = new TicketList();
        this.socketsEvents();
    }
    socketsEvents() {
        // ON connection
        this.io.on('connection', ( socket ) => {
            console.log('cliente conectado',  socket.id);
            // EVENTO ESCUCHA mensaje-to-server
            socket.on('solicitar-ticket', (data, callback) => {
                const nuevoTicket = this.ticketList.crearTicket();
                console.log(nuevoTicket);
                callback(nuevoTicket);
                // this.io.emit('mensaje-from-server', data);
            });
            socket.on('siguiente-ticket-trabajar', ({agente, escritorio}, callback) => {
                const suTicket = this.ticketList.asignarTicket(agente, escritorio);
                callback(suTicket);

                this.io.emit('ticket-asignado', this.ticketList.ultimos13);
            });
        });
    }
}
module.exports = Sockets;