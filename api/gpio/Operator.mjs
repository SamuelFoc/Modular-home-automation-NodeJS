import { Gpio } from "onoff"; // Include the onoff library
import os from "os"; // To detect the operating system

class Operator {
  constructor() {
    // Check if the platform supports GPIO
    this.isGpioSupported = os.platform() === "linux"; // GPIO typically works on Linux-based systems like Raspberry Pi

    if (!this.isGpioSupported) {
      console.warn(
        `GPIO is not supported on this platform (${os.platform()}). Actions will only be logged to the console.`
      );
    }
  }

  /**
   * Read the value of a GPIO pin.
   * @param {number} pinNumber - The GPIO pin number.
   * @returns {Promise<number>} The value of the pin (0 or 1).
   */
  async read(pinNumber) {
    if (!this.isGpioSupported) {
      console.log(`Simulated read from pin ${pinNumber}`);
      return 0; // Return a dummy value for unsupported platforms
    }

    try {
      const gpio = new Gpio(pinNumber, "in");
      const value = await gpio.read(); // Read the value of the pin
      gpio.unexport(); // Clean up
      return value;
    } catch (error) {
      console.error(
        `Failed to read from GPIO pin ${pinNumber}:`,
        error.message
      );
      throw error;
    }
  }

  /**
   * Write a value to a GPIO pin.
   * @param {number} pinNumber - The GPIO pin number.
   * @param {boolean} value - The value to write (true or false).
   */
  async write(pinNumber, value) {
    if (!this.isGpioSupported) {
      console.log(
        `Simulated write: ${value ? "ON" : "OFF"} to pin ${pinNumber}`
      );
      return;
    }

    try {
      const gpio = new Gpio(pinNumber, "out");
      await gpio.write(value); // Write the value to the pin
      gpio.unexport(); // Clean up
    } catch (error) {
      console.error(`Failed to write to GPIO pin ${pinNumber}:`, error.message);
      throw error;
    }
  }
}

export default Operator;
