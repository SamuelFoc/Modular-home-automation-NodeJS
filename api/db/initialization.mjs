import sequelize from "./index.mjs";

const initializeDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); // force: true will drop existing tables and recreate them
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing the database:", error);
  }
};

export default initializeDatabase;
