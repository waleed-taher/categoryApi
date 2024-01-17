const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  OrderID: { type: String },
  Category: { type: String },
  SubCategory: { type: String },
});

const CategoryDetailsReport = mongoose.model("categoryDetails", CategorySchema);

module.exports = CategoryDetailsReport;
