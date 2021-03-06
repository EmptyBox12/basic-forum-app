const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const commentController = require("../controllers/commentController");


const router = express.Router();
//post slug
router.route("/:slug").post(authMiddleware, commentController.createComment);
router.route("/:id").delete(authMiddleware, commentController.deleteComment);

module.exports = router;