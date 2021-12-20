const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) {
    res.status(401).json({ status: "fail", msg: "You don't have access" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) {
      res.status(401).json({ status: "fail", msg: "Expired or invalid token" });
    } else {
      req.user = user;
      next();
    }
  });
};
