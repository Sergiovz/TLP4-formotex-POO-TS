import { bootstrap } from "./main/bootstrap.js";
import { initDb } from "./main/db-init.js";
import { associations } from "./models/index.js";
import routes from "./routes/index.js";

(async function () {
  try {
    associations();
    await initDb();
    await bootstrap(routes);
  } catch (error) {
    console.error("Ocurrió un error al inicializar la aplicación:", error);
    process.exit(1);
  }
})();
