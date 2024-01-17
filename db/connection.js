const mongoose = require("mongoose");

const MONGOURL =
  "mongodb+srv://waleed:waleed123@vidly.owuqolt.mongodb.net/?retryWrites=true";
let isConnected = false;
async function connectToDatabase() {
  if (isConnected) {
    console.log("Database Already Connected");
    return;
  }

  try {
    db = await mongoose.connect(MONGOURL, {
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
