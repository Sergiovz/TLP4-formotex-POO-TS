import { Database } from "../config/database.js";

export async function initDb() {
  return await Database.getInstance().connect();
}
