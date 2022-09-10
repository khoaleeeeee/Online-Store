const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  user_id: {
    type: ObjectId,
    require: true,
  },
  order_number: {
    type: String,
    require: true,
    text: true,
  },
  order_date: {
    type: Date,
    require: true,
  },
  order_total: {
    type: Number,
    require: true,
  },

  items: [
    {
      img: {
        type: String,
        require: true,
      },
      title: {
        type: String,
        require: true,
        text: true,
      },
      ml: {
        type: Number,
        require: true,
      },
      price: {
        type: Number,
        requrie: true,
      },
      quantity: {
        type: Number,
        require: true,
      },
    },
  ],

  user: {
    first_name: {
      type: String,
      require: true,
    },
    last_name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      text: true,
    },
    address_1: {
      type: String,
      require: true,
    },
    address_2: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      require: true,
    },
    region: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    zip: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    company: {
      type: String,
      default: "",
    },
    shipping_method: {
      type: String,
      require: true,
    },
    payment_method: {
      type: Object,
      require: true,
    },
  },
});
module.exports = mongoose.model("Order", orderSchema);
