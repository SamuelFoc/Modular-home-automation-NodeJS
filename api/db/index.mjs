import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const sequelize = new Sequelize(
  process.env.POSTGRES_DB, // Database name
  process.env.POSTGRES_USER, // Database username
  process.env.POSTGRES_PASSWORD, // Database password
  {
    host: process.env.POSTGRES_HOST, // Database host
    port: process.env.POSTGRES_PORT, // Database port
    dialect: "postgres",
    logging: false, // Disable SQL query logs for cleanliness
  }
);

export const testConnection = async (retries = 5, delay = 5000) => {
  while (retries > 0) {
    try {
      await sequelize.authenticate();
      console.log("Database connection established successfully.");
      return; // Exit the loop if connection is successful
    } catch (error) {
      retries -= 1;
      console.error(
        `Unable to connect to the database. Retries left: ${retries}`
      );
      console.error(error.message);
      if (retries === 0)
        throw new Error(
          "Max retries reached. Unable to connect to the database."
        );
      await new Promise((res) => setTimeout(res, delay)); // Wait before retrying
    }
  }
};

export default sequelize;
