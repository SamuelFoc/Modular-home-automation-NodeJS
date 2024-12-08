import { Model, DataTypes } from "sequelize";
import sequelize from "../db/index.mjs";

class AbstractSensor extends Model {}

AbstractSensor.init(
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
    display_name: {
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
    sequelize,
    modelName: "AbstractSensor",
    tableName: "sensors", // Optional: Use a common table or separate tables
    timestamps: true,
    abstract: true, // This is a semantic flag; Sequelize doesn't support abstract models natively
  }
);

export default AbstractSensor;
