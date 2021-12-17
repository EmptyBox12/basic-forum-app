const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('express-jwt');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({
      msg: "fail",
      e,
    });
  }
};
//login
exports.loginUser = async (req,res) => {
  try{
    const {email, password} = req.body;


  } catch(e){

  }
}