const e = require("express");
const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {
  try {
    const { user_id, title, img, ml, price, quantity } = req.body;
    const existed_item = await Cart.findOneAndUpdate(
      { title: title, ml: ml, user_id: user_id },
      { $inc: { quantity: quantity } }
    );

    if (!existed_item) {
      const cartItem = await new Cart({
        user_id,
        title,
        img,
        ml,
        price,
        quantity,
      }).save();

      res.send({
        user_id: cartItem.user_id,
        title: cartItem.title,
        img: cartItem.img,
        ml: cartItem.ml,
        price: cartItem.price,
        quantity: cartItem.quantity,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCartItems = async (req, res) => {
  try {
    const { user_id } = req.body;
    const data = await Cart.find({ user_id: user_id });
    if (!data) {
      res.send([]);
    } else {
      res.send(data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { user_id, title, newQuan, ml } = req.body;
    if (newQuan === 0) {
      const deleted = await Cart.findOneAndDelete({
        user_id: user_id,
        title: title,
      });
      res.send(deleted);
    } else {
      const existed_item = await Cart.findOneAndUpdate(
        { title: title, ml: ml, user_id: user_id },
        { quantity: newQuan }
      );
      res.send(existed_item);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.emptyCart = async (req, res) => {
  try {
    const { user_id } = req.body;
    await Cart.deleteMany({ user_id: user_id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
