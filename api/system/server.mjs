import express from "express";
import onlineSensorRoutes from "./routes/onlineSensorRoutes.mjs";

// Sensoric data collecting API
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Sensoric API routes
app.use("/api/online_sensors", onlineSensorRoutes);

// Run Sensoric API
const startAPI = () => {
  app.listen(process.env?.PORT || 5000, () => {
    console.log(`API running on port ${process.env?.PORT || 5000}..`);
  });
};

// EXPORT
export default startAPI;
