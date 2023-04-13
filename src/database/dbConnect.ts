import mongoose, { Connection } from "mongoose";

abstract class Database {
  abstract connection(): Promise<void>;
  abstract execute(): Promise<void>;
}

//Informações de conexão com o banco
class Mongo implements Database {
  private user: String | undefined;
  private pass: String | undefined;
  private port: String | undefined;
  private host: String | undefined;
  private dbName: String | undefined;

  private dbConnection: mongoose.Connection | undefined;

  private connectionTime: Date | undefined;

  constructor() {
    this.user = process.env.DB_USER;
    this.pass = process.env.DB_PASS;
    this.port = process.env.DB_PORT;
    this.host = process.env.DB_HOST;
    this.dbName = process.env.DB_NAME;
  }

  public async connection(): Promise<void> {
    let hasAuth = false;

    //Verifica se há necessidade de realizar autenticação durante a conexão
    if (
      this.user != null &&
      this.pass != null &&
      this.user.length > 0 &&
      this.pass.length > 0
    ) {
      hasAuth = true;
    }

    try {
      mongoose.connection.setMaxListeners(0);

      mongoose.set("strictQuery", true);

      //Monta a string de conexão
      await mongoose.connect(
        `mongodb://${hasAuth ? `${this.user}:${this.pass}@` : ""}${this.host}:${
          this.port
        }/${this.dbName}${hasAuth ? `?authSource=admin` : ""}`
      );

      //Instancia a conexão com o MongoDB
      this.dbConnection = mongoose.connection;

      this.dbConnection.on(
        "Error",
        console.log.bind(console, "Connection error")
      );
      this.dbConnection.once("Open", () => {
        console.log.bind("Successful connection of database");
      });

      this.connectionTime = new Date();
    } catch (err) {
      this.connectionTime = undefined;
      console.log(err);
    }
  }
  public async execute(): Promise<void> {
    const now = new Date().toISOString();
    if (
      !this.dbConnection ||
      this.connectionTime === undefined ||
      this.connectionTime.toISOString() < now
    ) {
      this.connection();
    }
  }
}

export default Mongo;
