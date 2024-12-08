import OnlineSensor from "./OnlineSensor.mjs";
import SensoricData from "./SensoricData.mjs";

// Define associations
OnlineSensor.hasMany(SensoricData, {
  foreignKey: "s_id",
  as: "data",
});

SensoricData.belongsTo(OnlineSensor, {
  foreignKey: "s_id",
  as: "online_sensor",
});

// Export models with associations
export { OnlineSensor, SensoricData };
