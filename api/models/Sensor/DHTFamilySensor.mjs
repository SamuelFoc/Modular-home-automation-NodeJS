import AbstractSensor from "./AbstractSensor.mjs";

class DHTFamilySensor extends AbstractSensor {}

DHTFamilySensor.init(
  {
    unit: {
      type: DataTypes.STRING, // E.g., "Celsius", "Fahrenheit"
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "DHTFamilySensor",
    tableName: "dhtfamily_sensors", // You can opt for a different table if needed
    timestamps: true,
  }
);

export default DHTFamilySensor;
