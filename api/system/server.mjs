import express from "express";
import sensorRoutes from "./routes/sensorRoutes.mjs";

// Sensoric data collecting API
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Sensoric API routes
app.use("/api/sensors", sensorRoutes);

// Run Sensoric API
const startAPI = () => {
  app.listen(process.env?.PORT || 5000, () => {
    console.log(`API running on port ${process.env?.PORT || 5000}..`);
  });
};

// EXPORT
export default startAPI;
