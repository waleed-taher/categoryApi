const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  OrderID: { type: String },
Category: { type: String },
  SubCategory: { type: String },
});

const CategoryReport = mongoose.model("ProductDetails", CategorySchema);

module.exports = CategoryReport;
