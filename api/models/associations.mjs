import defineSensorAssociations from "./Sensor/SensorAssociator.mjs";
import SensoricData from "./SensoricData.mjs";
import DHTFamilySensor from "./Sensor/DHTFamilySensor.mjs";

// Define associations for all models
defineSensorAssociations(DHTFamilySensor, SensoricData); // For specific child model

// Export models with associations
export { AbstractSensor, TemperatureSensor, MotionSensor, SensoricData };
