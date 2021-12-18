module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null)
    res.status(401).json({ status: "fail", msg: "You don't have access" });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        status: "fail",
        msg: "Invalid or expired token",
      });
    }
    req.user = user;
    next();
  });
};
