const mongoose = require("mongoose");
require("dotenv").config();
const { DB_CNN } = process.env;
const dbConnection = async () => {
  try {
    await mongoose.connect(DB_CNN);
    console.log("DB connection established");
  } catch (error) {
    throw new Error("Error al conectar a la base de datos");
  }
};

module.exports = dbConnection;
