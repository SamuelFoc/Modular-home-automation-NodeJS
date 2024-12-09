import { OnlineSensor } from "../../models/associations.mjs";

// Create a new sensor
export const createSensor = async (req, res) => {
  const { s_id, name, description } = req.body;

  // Validate input
  if (!s_id || !name) {
    return res.status(400).json({
      message: "Missing required fields: 's_id' and 'name' are mandatory.",
    });
  }

  try {
    const online_sensor = await OnlineSensor.create({
      s_id,
      name,
      description,
    });
    res.status(201).json({
      message: "Online sensor created successfully",
      data: online_sensor,
    });
  } catch (error) {
    console.error("Error creating sensor:", error);

    // Handle unique constraint violation (e.g., duplicate s_id)
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        message: `An online sensor with s_id "${s_id}" already exists.`,
        error: error.message,
      });
    }

    res.status(500).json({
      message: "Error creating sensor",
      error: error.message,
    });
  }
};

// Read (get) a single sensor by sID
export const getSensorById = async (req, res) => {
  const { sID } = req.params;

  try {
    const online_sensor = await OnlineSensor.findOne({ where: { s_id: sID } });
    if (!online_sensor) {
      return res
        .status(404)
        .json({ message: `Sensor with sID "${sID}" not found.` });
    }
    res.status(200).json(online_sensor);
  } catch (error) {
    console.error("Error fetching sensor:", error);
    res.status(500).json({
      message: "Error fetching sensor",
      error: error.message,
    });
  }
};

// Read (get) all sensors
export const getAllSensors = async (req, res) => {
  try {
    const online_sensors = await OnlineSensor.findAll();
    res.status(200).json(online_sensors);
  } catch (error) {
    console.error("Error fetching sensors:", error);
    res.status(500).json({
      message: "Error fetching sensors",
      error: error.message,
    });
  }
};

// Update a sensor by sID
export const updateSensor = async (req, res) => {
  const { sID } = req.params;
  const { name, description } = req.body;

  try {
    const online_sensor = await OnlineSensor.findOne({ where: { s_id: sID } });
    if (!online_sensor) {
      return res
        .status(404)
        .json({ message: `Online sensor with sID "${sID}" not found.` });
    }

    online_sensor.name = name || online_sensor.name;
    online_sensor.description = description || online_sensor.description;
    await online_sensor.save();

    res.status(200).json({
      message: "Online sensor updated successfully",
      data: online_sensor,
    });
  } catch (error) {
    console.error("Error updating online sensor:", error);
    res.status(500).json({
      message: "Error updating online sensor",
      error: error.message,
    });
  }
};

// Delete a sensor by sID
export const deleteSensor = async (req, res) => {
  const { sID } = req.params;

  try {
    const online_sensor = await OnlineSensor.findOne({ where: { s_id: sID } });
    if (!online_sensor) {
      return res
        .status(404)
        .json({ message: `Online sensor with sID "${sID}" not found.` });
    }

    await online_sensor.destroy();
    res.status(200).json({
      message: `Online sensor with sID "${sID}" deleted successfully.`,
    });
  } catch (error) {
    console.error("Error deleting sensor:", error);
    res.status(500).json({
      message: "Error deleting sensor",
      error: error.message,
    });
  }
};
