import { Sequelize } from "sequelize";
import { env } from "./environment.js";

export class Database {
  private static instance: Database;
  private sequelize: Sequelize;

  private constructor() {
    console.log("Conectando a la base de datos...");
    console.log(env.db.config);
    this.sequelize = new Sequelize({
      database: env.db.config.database!,
      username: env.db.config.user!,
      password: env.db.config.password!,
      dialect: "mysql",
    });
  }

  public static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect() {
    try {
      await this.sequelize.authenticate();
      console.log("Base de datos conectada!.");
      await this.sequelize.sync({ alter: true, force: false });
    } catch (error) {
      console.error("Error al conectar a la base de datos:", error);
    }
    return this.sequelize;
  }

  public async disconnect() {
    try {
      await this.sequelize.close();
      console.log("Base de datos desconectada!.");
    } catch (err) {
      console.error("Error al desconectar de la base de datos:", err);
    }
    return true;
  }

  public ping() {
    if (!this.sequelize) {
      console.error("No hay conexión a la base de datos.");
    } else {
      this.sequelize.authenticate();
      console.log("Ping a la db exitosa!");
    }
    return;
  }

  public getConnection() {
    return this.sequelize;
  }
}
