const jwt = require("jsonwebtoken");
const Token = require("../models/Token");

exports.refreshToken = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const verifyToken = await Token.findOne({ token: token });
    jwt.verify(
      verifyToken.token,
      process.env.REFRESH_TOKEN_SECRET,
      (err, user) => {
        if (err) {
          res
            .status(401)
            .json({ status: "fail", msg: "You don't have access" });
        } else {
          const newUser = user.newUser;
          const accessToken = jwt.sign(
            { newUser },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
          );
          res.status(201).json({
            accessToken,
            refreshToken: token,
            user,
          });
        }
      }
    );
  } catch (e) {
    res.status(401).json({ status: "fail", msg: "You don't have access" });
  }
}