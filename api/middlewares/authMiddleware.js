const jwt = require("jsonwebtoken");
const Token = require("../models/Token");
//if it gets access token get user, if it gets refreshToken return accessToken
module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) {
    res.status(401).json({ status: "fail", msg: "You don't have access" });
  } 
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) {
      try {
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
    } else {
      req.user = user;
      next();
    }
  });
};
