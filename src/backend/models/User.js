const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  signin_info: {
    email: {
      type: String,
      require: true,
      text: true,
    },
    password: {
      type: String,
      require: true,
      text: true,
    },
  },
  personal_info: {
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
      default: "",
      requrie: false,
    },
    payment_method: {
      type: {
        type: String,
        default: "",
      },
      card_number: {
        type: String,
        default: "",
      },
      expiration: {
        type: Date,
        default: null,
      },
      require: false,
    },
  },
  cart: [
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
});

module.exports = mongoose.model("User", userSchema);
