import OnlineSensor from "../../models/OnlineSensor.mjs";
import SensoricData from "../../models/SensoricData.mjs";

export const recordSensoricData = async (req, res) => {
  const { sID } = req.params; // sID from the route parameter
  const data = req.body; // Sensoric data from the request body

  try {
    // Find the sensor by its s_id
    const sensor = await OnlineSensor.findOne({ where: { s_id: sID } });

    if (!sensor) {
      // Return 404 if the sensor is not found
      return res.status(404).json({
        message: `Sensor with sID: "${sID}" not found.`,
      });
    }

    // Create a new sensoric data entry
    const sensoricData = await SensoricData.create({
      s_id: sID, // Reference the sensor's primary key
      data,
    });

    // Send a 201 Created response with the saved data
    res.status(201).json({
      message: `Data received and saved for sensoric ID: ${sID}`,
      data: sensoricData,
    });
  } catch (error) {
    // Handle errors and send a 500 Internal Server Error response
    console.error("Error saving sensoric data:", error);
    res.status(500).json({
      message: "An error occurred while saving the data.",
      error: error.message,
    });
  }
};
