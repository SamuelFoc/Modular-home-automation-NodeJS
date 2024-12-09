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
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    dataPin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    powerPin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    state: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    validate: {
      // Custom validator to ensure dataPin and powerPin are not both true
      cannotHaveBothDataAndPowerPins() {
        if (this.dataPin && this.powerPin) {
          throw new Error(
            "A GPIO cannot have both dataPin and powerPin set to true."
          );
        }
      },
    },
  }
);

export default Gpio;
