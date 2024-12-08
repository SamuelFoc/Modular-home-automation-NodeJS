import Gpio from "../../models/Gpio.mjs";
import OfflineSensor from "../../models/OfflineSensor.mjs";
import { Gpio as RaspiGpio } from "onoff";

const isProduction = process.env.NODE_ENV === "production";

export const readSensorsDataPin = async (req, res) => {
  try {
    const { s_id } = req.params;

    // Check if the offline sensor exists
    const sensor = await OfflineSensor.findByPk(s_id);

    if (!sensor) {
      return res
        .status(404)
        .json({ message: `Offline sensor with ID: "${s_id}" not found.` });
    }

    // Find the GPIO where dataPin is true and associated with the sensor
    const dataPin = await Gpio.findOne({
      where: { s_id: s_id, dataPin: true },
    });

    if (!dataPin) {
      return res.status(404).json({
        message: `No data pin associated with offline sensor with ID: "${s_id}".`,
      });
    }

    let value = null;

    if (isProduction) {
      // Actual GPIO reading only in production mode
      const pinNumber = parseInt(dataPin.pinNumber, 10); // Ensure pinNumber is a number
      const gpio = new RaspiGpio(pinNumber, "in"); // Set GPIO as input

      value = gpio.readSync(); // Read the pin value synchronously (0 or 1)

      // Close the GPIO pin after reading
      gpio.unexport();
    } else {
      // Simulate a GPIO value in development mode
      value = Math.round(Math.random()); // Simulates a 0 or 1 value randomly
    }

    // Respond with the read value
    return res.status(200).json({
      message: `Successfully read data from GPIO: ${dataPin.pinNumber}.`,
      value: value, // 0 or 1
    });
  } catch (error) {
    // Catch and handle errors
    console.error("Error reading sensor data pin:", error.message);
    return res.status(500).json({
      message: "An error occurred while reading sensor data pin.",
      error: error.message,
    });
  }
};
