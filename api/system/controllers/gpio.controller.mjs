import { Gpio } from "../../models/associations.mjs";
import { OfflineSensor } from "../../models/associations.mjs";
import Operator from "../../gpio/Operator.mjs"; // Assuming Operator is stored in utils

// Create a global instance of Operator
const operator = new Operator();

// Create a new GPIO
export const createGpio = async (req, res) => {
  try {
    const { pinNumber, dataPin, s_id } = req.body;
    const gpio = await Gpio.create({ pinNumber, s_id: s_id || null, dataPin });
    res.status(201).json(gpio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Associate GPIO with a Sensor
export const associateGpioWithSensor = async (req, res) => {
  try {
    const { pinNumber, dataPin, powerPin, s_id } = req.body; // GPIO pin number and Sensor ID

    // Validate input
    if (!pinNumber || !s_id) {
      return res.status(400).json({
        error: "Missing required fields: 'pinNumber' and 's_id' are mandatory.",
      });
    }

    // Check if the sensor exists
    const sensor = await OfflineSensor.findByPk(s_id);
    if (!sensor) {
      return res
        .status(404)
        .json({ error: `OfflineSensor with s_id "${s_id}" not found.` });
    }

    // Check if the GPIO exists by pinNumber
    let gpio = await Gpio.findOne({ where: { pinNumber } });

    if (!gpio) {
      // If GPIO does not exist, create it and associate with the sensor
      gpio = await Gpio.create({ pinNumber, s_id, dataPin, powerPin });
      return res.status(201).json({
        message: "GPIO created and associated with the sensor successfully.",
        gpio,
      });
    }

    // Check if the GPIO is already associated with a sensor
    if (gpio.s_id) {
      if (gpio.s_id === s_id) {
        // Already associated with the specified sensor
        return res.status(200).json({
          message: "GPIO is already associated with the specified sensor.",
          gpio,
        });
      } else {
        // Associated with another sensor
        const existingSensor = await OfflineSensor.findByPk(gpio.s_id);
        return res.status(400).json({
          error: `GPIO with pinNumber ${pinNumber} is already associated with another sensor: s_id "${gpio.s_id}".`,
          associatedSensor: existingSensor,
        });
      }
    }

    // If GPIO exists but is not associated, associate it with the sensor
    gpio.s_id = s_id;
    await gpio.save();

    return res.status(200).json({
      message: "GPIO associated with the sensor successfully.",
      gpio,
    });
  } catch (error) {
    console.error("Error associating GPIO with sensor:", error);
    res.status(500).json({ error: error.message });
  }
};

// Turn GPIO On or Off
export const turnOnOff = async (req, res) => {
  try {
    const { id } = req.params; // GPIO ID
    const { state } = req.body;

    if (typeof state !== "boolean") {
      return res.status(400).json({
        error: `State must be defined as a boolean (true / false) in the body!`,
      });
    }

    const gpio = await Gpio.findByPk(id);
    if (!gpio) {
      return res.status(404).json({ error: `GPIO with ID: ${id} not found.` });
    }

    // Ensure the GPIO is a power pin
    if (!gpio.powerPin) {
      return res.status(400).json({
        error: `GPIO cannot be turned ON or OFF because the powerPin property has to be set to true.`,
      });
    }

    const value = state;
    await operator.write(gpio.pinNumber, value);

    gpio.state = state;
    await gpio.save();

    res
      .status(200)
      .json({
        message: `GPIO ID:${id} & PIN: ${gpio.pinNumber} turned ${
          state ? "ON" : "OFF"
        }.`,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read GPIO State
export const readGpio = async (req, res) => {
  try {
    const { id } = req.params; // GPIO ID

    const gpio = await Gpio.findByPk(id);
    if (!gpio) {
      return res.status(404).json({ error: `GPIO with ID: ${id} not found.` });
    }

    let state;
    if (gpio.dataPin) {
      state = await operator.read(gpio.pinNumber);
    } else if (gpio.powerPin) {
      state = gpio.state;
    } else {
      return res.status(400).json({
        error: `GPIO with ID: ${id} is neither a data pin nor a power pin. Cannot read its value.`,
      });
    }

    res.status(200).json({ id: gpio.id, pinNumber: gpio.pinNumber, state });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    const { pinNumber, dataPin, powerPin, s_id } = req.body;
    const gpio = await Gpio.findByPk(req.params.id);

    if (!gpio) {
      return res.status(404).json({ error: "GPIO not found" });
    }

    // Update only if values are explicitly provided
    if (pinNumber !== undefined) gpio.pinNumber = pinNumber;
    if (dataPin !== undefined) gpio.dataPin = dataPin;
    if (powerPin !== undefined) gpio.powerPin = powerPin;
    if (s_id !== undefined) gpio.s_id = s_id;

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
