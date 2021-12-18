const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      email: user.email,
      username: user.username,
    });
  } catch (e) {
    res.status(400).json({
      msg: "fail",
      e,
    });
  }
};
//login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      res.status(400).json({
        status: "fail",
        msg: "Please enter an email!",
      });
    }
    const user = await User.findOne({ email: email });
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        let newUser = {
          _id: user._id,
          username: user.username,
          email: user.email,
          posts: user.posts,
        };
        const accessToken = jwt.sign(
          { newUser },
          process.env.ACCESS_TOKEN_SECRET
        );
        res.json({ accessToken });
      } else {
        res.status(400).json({
          status: "fail",
        });
      }
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
    });
  }
};
