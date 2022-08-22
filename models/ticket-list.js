const Ticket = require('./ticket');

class TicketList {
    constructor() {
        this.ultimoNumero = 0;
        this.pendiente = [];
        this.asignados = [];
    }

    get siguienteNumero() {
        this.ultimoNumero++;
        return this.ultimoNumero;
    }

    get ultimos13() {
        return this.asignados.slice(0, 13);
    }
     crearTicket() {
        const nuevoTicket = new Ticket(this.siguienteNumero);
        this.pendiente.push(nuevoTicket);
        return nuevoTicket;
    }

    asignarTicket(agente, escritorio) {
        if (this.pendiente.length === 0) {
            return null;
        }
        const siguienteTicket = this.pendiente.shift();

        siguienteTicket.agente = agente;
        siguienteTicket.escritorio = escritorio;

        this.asignados.unshift(siguienteTicket);

        return siguienteTicket;
    }
}
module.exports = TicketList