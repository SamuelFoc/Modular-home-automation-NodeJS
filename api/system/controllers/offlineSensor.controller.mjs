import OfflineSensor from "../../models/OfflineSensor.mjs";

// Create a new OfflineSensor
export const createOfflineSensor = async (req, res) => {
  try {
    const { s_id, name, description, attributes, last_data } = req.body;
    const offlineSensor = await OfflineSensor.create({
      s_id,
      name,
      description,
      attributes,
      last_data,
    });
    res.status(201).json(offlineSensor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all OfflineSensors
export const getAllOfflineSensors = async (req, res) => {
  try {
    const offlineSensors = await OfflineSensor.findAll();
    res.status(200).json(offlineSensors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single OfflineSensor by s_id
export const getOfflineSensorById = async (req, res) => {
  try {
    const offlineSensor = await OfflineSensor.findByPk(req.params.s_id);
    if (!offlineSensor) {
      return res.status(404).json({ error: "OfflineSensor not found" });
    }
    res.status(200).json(offlineSensor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an OfflineSensor
export const updateOfflineSensor = async (req, res) => {
  try {
    const { name, description, attributes, last_data } = req.body;
    const offlineSensor = await OfflineSensor.findByPk(req.params.s_id);
    if (!offlineSensor) {
      return res.status(404).json({ error: "OfflineSensor not found" });
    }
    offlineSensor.name = name || offlineSensor.name;
    offlineSensor.description = description || offlineSensor.description;
    offlineSensor.attributes = attributes || offlineSensor.attributes;
    offlineSensor.last_data = last_data || offlineSensor.last_data;
    await offlineSensor.save();
    res.status(200).json(offlineSensor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an OfflineSensor
export const deleteOfflineSensor = async (req, res) => {
  try {
    const offlineSensor = await OfflineSensor.findByPk(req.params.s_id);
    if (!offlineSensor) {
      return res.status(404).json({ error: "OfflineSensor not found" });
    }
    await offlineSensor.destroy();
    res.status(200).json({ message: "OfflineSensor deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
