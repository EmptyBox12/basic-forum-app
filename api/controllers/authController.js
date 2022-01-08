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
      slug: user.slug,
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
      return res.status(400).json({
        status: "fail",
        msg: "Please enter an email!",
      });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        status: "fail",
        msg: "email not found",
      });
    }
    bcrypt.compare(password, user.password, async function (err, result) {
      if (result) {
        let newUser = {
          _id: user._id,
          username: user.username,
          email: user.email,
          posts: user.posts,
          slug: user.slug,
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
        await Token.create({ user: user._id, token: refreshToken });
        return res.status(200).json({ accessToken, refreshToken, newUser });
      } else {
        return res.status(400).json({
          status: "fail",
          msg: "Wrong password",
        });
      }
    });
  } catch (e) {
    return res.status(400).json({
      status: "fail",
      msg: "E-mail doesn't exist",
    });
  }
};
exports.logoutUser = async (req, res) => {
  try {
    const userID = req.user.newUser._id;
    let deleted = await Token.deleteOne({ user: userID });
    res.status(201).json({
      status:"success",
      msg:"logged out"
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status:"fail",
      msg:"can't log out"
    })
  }
};
exports.getUser = async (req, res) => {
  try{
    const userID = req.user.newUser._id;
    const user = await User.findOne({_id: userID}).select("-password");
    res.status(200).json({
      user: user,
    })
  } catch(error){
    console.log(error);
    return res.status(400).json({
      status:"fail",
      msg:"can't get user"
    });
  }
}