import express from "express";
import onlineSensorRoutes from "./routes/onlineSensor.routes.mjs";
import offlineSensorRoutes from "./routes/offlineSensor.routes.mjs";
import gpioRoutes from "./routes/gpio.routes.mjs";

// Sensoric data collecting API
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Sensoric API routes
app.use("/api/system/online_sensors", onlineSensorRoutes);
app.use("/api/system/offline_sensors", offlineSensorRoutes);
app.use("/api/system/gpios", gpioRoutes);

// Run Sensoric API
const startAPI = () => {
  app.listen(process.env?.PORT || 5000, () => {
    console.log(`API running on port ${process.env?.PORT || 5000}..`);
  });
};

// EXPORT
export default startAPI;
