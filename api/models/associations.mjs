import Gpio from "./Gpio.mjs";
import OfflineSensor from "./OfflineSensor.mjs";
import OnlineSensor from "./OnlineSensor.mjs";
import SensoricData from "./SensoricData.mjs";

// Online Sensors and the Sensoric Data
OnlineSensor.hasMany(SensoricData, {
  foreignKey: "s_id",
});

SensoricData.belongsTo(OnlineSensor, {
  foreignKey: "s_id",
});

// Offline Sensors and the Gpios
OfflineSensor.hasMany(Gpio, {
  foreignKey: "s_id",
});

Gpio.belongsTo(OfflineSensor, {
  foreignKey: "s_id",
});

// Export models with associations
export { OnlineSensor, SensoricData, OfflineSensor, Gpio };
