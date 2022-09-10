const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    text: true,
  },
  subtitle: {
    type: String,
    required: true,
    text: true,
  },
  category: {
    type: String,
    require: true,
  },
  brand: {
    type: String,
    require: true,
  },
  options: {
    images: {
      type: Array,
      require: true,
    },
    prices: {
      type: Array,
      require: true,
    },
  },
  description: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Item", itemSchema);
