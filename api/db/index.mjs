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

export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default sequelize;
