import sequelize, { testConnection } from "./index.mjs";

const initializeDatabase = async () => {
  try {
    await testConnection(); // Ensure connection is established before proceeding
    await sequelize.sync({ alter: true }); // Use { alter: true } to avoid dropping tables unnecessarily
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error initializing the database:", error);
    process.exit(1); // Exit the process if initialization fails
  }
};

export default initializeDatabase;
