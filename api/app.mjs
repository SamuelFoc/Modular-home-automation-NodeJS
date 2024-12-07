import initializeDatabase from "./db/initialization.mjs";
import startSensoricAPI from "./sensoric/server.mjs";
import startAPI from "./system/server.mjs";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

(async () => {
  await initializeDatabase();

  startSensoricAPI();
  startAPI();
})();
