import express from "express";
import sensoricApiRoutes from "./routes/sensoricApi.routes.mjs";

// Sensoric data collecting API
const s_app = express();

// Middleware to parse JSON bodies
s_app.use(express.json());

// Sensoric API routes
s_app.use("/sensoric_api", sensoricApiRoutes);

// Run Sensoric API
const startSensoricAPI = () => {
  s_app.listen(process.env?.S_PORT || 3333, () => {
    console.log(
      `Sensoric API running on port ${process.env?.S_PORT || 3333}..`
    );
  });
};

// EXPORT
export default startSensoricAPI;
