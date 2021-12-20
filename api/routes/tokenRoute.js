const express = require("express");
const tokenController = require("../controllers/tokenController");
const router = express.Router();

router.route("/").post(tokenController.refreshToken);




module.exports = router;