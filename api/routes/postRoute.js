const express = require("express");
const postController = require("../controllers/postController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/").get(postController.getAllPosts);
router.route("/").post(authMiddleware, postController.createPost);
router.route("/:slug").get(postController.getPost);
router.route("/:slug").delete(authMiddleware, postController.deletePost);
router.route("/userPosts/:slug").get(postController.getUserPosts);



module.exports = router;
