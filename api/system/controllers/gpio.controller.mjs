import Gpio from "../../models/Gpio.mjs";
import OfflineSensor from "../../models/OfflineSensor.mjs";

// Create a new GPIO
export const createGpio = async (req, res) => {
  try {
    const { pinNumber, s_id } = req.body;
    const gpio = await Gpio.create({ pinNumber, s_id: s_id || null });
    res.status(201).json(gpio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Associate GPIO with a Sensor
export const associateGpioWithSensor = async (req, res) => {
  try {
    const { id } = req.params; // GPIO ID
    const { s_id } = req.body; // Sensor ID

    // Check if the GPIO exists
    const gpio = await Gpio.findByPk(id);
    if (!gpio) {
      return res.status(404).json({ error: "GPIO not found" });
    }

    // Check if the OfflineSensor exists
    const sensor = await OfflineSensor.findByPk(s_id);
    if (!sensor) {
      return res
        .status(404)
        .json({ error: `OfflineSensor with s_id "${s_id}" not found` });
    }

    // Associate GPIO with the OfflineSensor
    gpio.s_id = s_id;
    await gpio.save();
    res.status(200).json(gpio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all GPIOs
export const getAllGpios = async (req, res) => {
  try {
    const gpios = await Gpio.findAll();
    res.status(200).json(gpios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single GPIO by ID
export const getGpioById = async (req, res) => {
  try {
    const gpio = await Gpio.findByPk(req.params.id);
    if (!gpio) {
      return res.status(404).json({ error: "GPIO not found" });
    }
    res.status(200).json(gpio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a GPIO
export const updateGpio = async (req, res) => {
  try {
    const { pinNumber, s_id } = req.body;
    const gpio = await Gpio.findByPk(req.params.id);
    if (!gpio) {
      return res.status(404).json({ error: "GPIO not found" });
    }
    gpio.pinNumber = pinNumber || gpio.pinNumber;
    gpio.s_id = s_id || gpio.s_id;
    await gpio.save();
    res.status(200).json(gpio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a GPIO
export const deleteGpio = async (req, res) => {
  try {
    const gpio = await Gpio.findByPk(req.params.id);
    if (!gpio) {
      return res.status(404).json({ error: "GPIO not found" });
    }
    await gpio.destroy();
    res.status(200).json({ message: "GPIO deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
