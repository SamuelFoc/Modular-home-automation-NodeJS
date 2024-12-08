import { DataTypes } from "sequelize";
import sequelize from "../db/index.mjs";

const Gpio = sequelize.define(
  "Gpio",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    pinNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    s_id: {
      type: DataTypes.STRING, // Matches the s_id in OfflineSensor
      allowNull: true,
      references: {
        model: "offline_sensors", // Table name of OfflineSensor
        key: "s_id",
      },
      onDelete: "CASCADE", // Ensures child rows are deleted when parent is deleted
      onUpdate: "CASCADE",
    },
  },
  {
    tableName: "gpios",
    timestamps: true,
  }
);

export default Gpio;
