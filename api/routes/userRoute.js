const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/register").post(authController.createUser);
router.route("/login").post(authController.loginUser);
router.route("/logout").post(authMiddleware, authController.logoutUser);
router.route("/getUser").get(authMiddleware, authController.getUser);


module.exports = router;
