export default function defineSensorAssociations(
  SensorModel,
  SensoricDataModel
) {
  SensorModel.hasMany(SensoricDataModel, {
    foreignKey: "s_id",
    as: "data",
  });

  SensoricDataModel.belongsTo(SensorModel, {
    foreignKey: "s_id",
    as: "sensor",
  });
}
