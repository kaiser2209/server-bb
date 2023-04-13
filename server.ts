import express, { json } from 'express';
import router from './src/routes';

const app = express();

app.use(json());

const port = 3000;

app.use('/', router);

app.listen(port, () => {
    console.log('Servidor iniciado na porta ', port);
});