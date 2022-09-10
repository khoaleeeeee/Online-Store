const Order = require("../models/Order");

exports.addOrder = async (req, res) => {
  try {
    const { order_number, order_date, items, user, user_id, order_total } =
      req.body;

    const order = await new Order({
      order_total,
      order_number,
      order_date,
      items,
      user,
      user_id,
    }).save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findOrder = async (req, res) => {
  const { order_number, email } = req.body;
  try {
    const order = await Order.findOne({
      order_number: order_number,
      "user.email": email,
    });
    if (!order) {
      return res
        .status(400)
        .json({ message: "Your order could not be found." });
    } else {
      res.json(order);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrderByParams = async (req, res) => {
  const user_id = req.params.userid;
  const order_number = req.params.ordernumber;

  try {
    const order = await Order.findOne({
      order_number: order_number,
      user_id: user_id,
    });

    if (!order) {
      return res
        .status(400)
        .json({ message: "Your order could not be found." });
    } else {
      res.json(order);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  const { user_id } = req.body;
  try {
    const data = await Order.find({ user_id: user_id });
    if (!data) {
      res.status(400).json({ message: "No order found" });
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
