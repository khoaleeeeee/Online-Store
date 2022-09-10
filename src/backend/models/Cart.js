const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const cartSchema = mongoose.Schema({
  user_id: {
    type: ObjectId,
    required: true,
  },
  title: {
    type: String,
  },
  img: {
    type: String,
  },
  ml: {
    type: Number,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
