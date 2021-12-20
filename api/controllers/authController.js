const User = require("../models/User");
const Token = require("../models/Token");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      email: user.email,
      username: user.username,
      slug: user.slug
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
    bcrypt.compare(password, user.password, async function (err, result) {
      if (result) {
        let newUser = {
          _id: user._id,
          username: user.username,
          email: user.email,
          posts: user.posts,
        };
        const accessToken = jwt.sign(
          { newUser },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
        );
        const refreshToken = jwt.sign(
          { newUser },
          process.env.REFRESH_TOKEN_SECRET
        );
        res.json({ accessToken, refreshToken, newUser });
        await Token.create({ user: user._id, token: refreshToken });
      } else {
        res.status(400).json({
          status: "fail",
          msg: "Wrong password",
        });
      }
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      msg: "E-mail doesn't exist",
    });
  }
};
exports.logoutUser = async (req, res) => {
  const userID = req.user.newUser._id;
  await Token.deleteOne({user: userID});
}
