import Sensor from "./Sensor.mjs";
import SensoricData from "./SensoricData.mjs";

// Define associations
Sensor.hasMany(SensoricData, {
  foreignKey: "s_id",
  as: "data",
});

SensoricData.belongsTo(Sensor, {
  foreignKey: "s_id",
  as: "sensor",
});

// Export models with associations
export { Sensor, SensoricData };
