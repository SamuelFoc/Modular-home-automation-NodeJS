import Gpio from "./Gpio.mjs";
import OfflineSensor from "./OfflineSensor.mjs";
import OnlineSensor from "./OnlineSensor.mjs";
import SensoricData from "./SensoricData.mjs";

// Online Sensors and Sensoric Data
OnlineSensor.hasMany(SensoricData, {
  foreignKey: "s_id",
  as: "sensoricData",
});

SensoricData.belongsTo(OnlineSensor, {
  foreignKey: "s_id",
  as: "onlineSensor",
});

// Offline Sensors and GPIOs
OfflineSensor.hasMany(Gpio, {
  foreignKey: "s_id",
  as: "gpios", // Alias for the collection of GPIOs
});

Gpio.belongsTo(OfflineSensor, {
  foreignKey: "s_id",
  as: "sensor", // Alias for the parent sensor
});

export { OnlineSensor, SensoricData, OfflineSensor, Gpio };
