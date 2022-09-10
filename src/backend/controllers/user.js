const User = require("../models/User");

exports.signup = async (req, res) => {
  try {
    const { signin_info, personal_info } = req.body;

    const user = await new User({
      signin_info: signin_info,
      personal_info: personal_info,
      cart: [],
    }).save();
    res.send(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      "signin_info.email": email,
      "signin_info.password": password,
    });
    if (!user) {
      return res.status(400).json({ message: "Account does not exist." });
    } else {
      res.json({
        email: user.signin_info.email,
        personal_info: user.personal_info,
        _id: user._id,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.accountExist = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({
      "signin_info.email": email,
    });
    if (user) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
