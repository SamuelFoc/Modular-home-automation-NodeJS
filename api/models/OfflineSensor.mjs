import { DataTypes } from "sequelize";
import sequelize from "../db/index.mjs";

const OfflineSensor = sequelize.define(
  "OfflineSensor",
  {
    s_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true, // Make s_id the primary key
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    attributes: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    last_data: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  },
  {
    tableName: "offline_sensors",
    timestamps: true,
  }
);

export default OfflineSensor;
