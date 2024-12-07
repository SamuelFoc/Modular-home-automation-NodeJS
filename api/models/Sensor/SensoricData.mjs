import { DataTypes } from "sequelize";
import sequelize from "../../db/index.mjs";
import Sensor from "./AbstractSensor.mjs";

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
        model: "sensors", // References the "sensors" table
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
  const sensor = await Sensor.findByPk(sensoricData.s_id);
  if (sensor) {
    sensor.last_data = sensoricData.data;
    await sensor.save();
  }
});

export default SensoricData;
