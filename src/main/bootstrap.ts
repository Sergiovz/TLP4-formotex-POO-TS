import express from "express";
import morgan from "morgan";
import { env } from "../config/environment.js";

export async function bootstrap(
  AppRoutes: express.Router
): Promise<express.Router> {
  const PORT = env.server.config.port;
  const HOST = env.server.config.host;
  const app = express();
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api", AppRoutes);
  app.listen(PORT, HOST, () => {
    console.log(`corriendo en: http://${HOST}:${PORT}`);
  });
  return app;
}
