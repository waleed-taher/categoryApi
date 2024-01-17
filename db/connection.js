const mongoose = require("mongoose");


let isConnected = false;
async function connectToDatabase(MONGODB_URI) {
  if (isConnected) {
    console.log("Database Already Connected");
    return;
  }

  try {
    db = await mongoose.connect(MONGODB_URI, {
      dbName: "StockReport",
    });
    isConnected = true;
    console.log("MongoDB is connected");
    return db;
  } catch (error) {
    throw error;
  }
}

module.exports = connectToDatabase;
