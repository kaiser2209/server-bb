import { Server } from 'socket.io';
import apiServer from '../../server';

export class Socket {
    private io?: Server;

    constructor(){}

    create() {
        this.io = new Server(apiServer, {
            cors: {
                origin: "*"
            }
        });

        this.io.on('connection', (socket) => {
            console.log('Cliente conectado...');
        });
    }

    sendMessage(event: string, message: {
        title: string,
        message?: string,
        object: any
    }) {
        this.io?.emit(event, message);
    }
}