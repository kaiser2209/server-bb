import express, { json } from 'express';
import router from './src/routes';
import socket from './src/socket';

const app = express();

app.use(json());

const port = 3000;

app.use('/', router);

const apiServer = app.listen(port, () => {
    console.log('Servidor iniciado na porta ', port);
});

export default apiServer;

socket.create();