import express, { json } from "express";
import Mongo from "./src/database/dbConnect";
import router from "./src/routes";
import * as dotenv from "dotenv";
import socket from "./src/socket";

dotenv.config();

const app = express();
export const db = new Mongo();

db.execute();

app.use(json());

const port = 3000;

app.use("/", router);

const apiServer = app.listen(port, () => {
  console.log("Servidor iniciado na porta ", port);
});

export default apiServer;

socket.create();
