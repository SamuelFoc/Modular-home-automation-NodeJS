import { DataTypes } from "sequelize";
import sequelize from "../db/index.mjs";

const Sensor = sequelize.define(
  "Sensor",
  {
    s_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    last_data: {
      type: DataTypes.JSONB, // JSONB type for storing the latest data
      allowNull: true,
    },
  },
  {
    tableName: "sensors",
    timestamps: true, // Adds createdAt and updatedAt columns
  }
);

export default Sensor;
