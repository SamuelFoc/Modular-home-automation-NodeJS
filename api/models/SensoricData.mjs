import { DataTypes } from "sequelize";
import sequelize from "../db/index.mjs";
import OnlineSensor from "./OnlineSensor.mjs";
import OfflineSensor from "./OfflineSensor.mjs";

const SensoricData = sequelize.define(
  "SensoricData",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    s_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "online_sensors", // References the "sensors" table
        key: "s_id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    data: {
      type: DataTypes.JSONB, // JSONB is PostgreSQL specific
      allowNull: false,
    },
  },
  {
    tableName: "sensoric_data",
    timestamps: true, // Adds createdAt and updatedAt columns
  }
);

// Hook to update the last_data attribute of the Sensor model
SensoricData.addHook("afterCreate", async (sensoricData, options) => {
  const online_sensor = await OnlineSensor.findByPk(sensoricData.s_id);
  if (online_sensor) {
    online_sensor.last_data = sensoricData.data;
    await online_sensor.save();
  }
});

export default SensoricData;
