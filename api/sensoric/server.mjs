import express from "express";
import dataRoutes from "./routes/data.routes.mjs";
import offlineSensorRoutes from "./routes/offlineSensor.routes.mjs";

// Sensoric data collecting API
const s_app = express();

// Middleware to parse JSON bodies
s_app.use(express.json());

// Sensoric API routes
s_app.use("/api/sensoric/data", dataRoutes);
s_app.use("/api/sensoric/read", offlineSensorRoutes);

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
