const Comment = require("../models/Comment");
const Post = require("../models/Post");

exports.createComment = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    const comment = await Comment.create({
      content: req.body.content,
      commentor: req.user.newUser._id,
      post: post._id,
    });
    post.comments.push(comment._id);
    await post.save();
    res.status(201).json({ status: "success", comment });
  } catch (e) {
    res.status(400).json({ status: "fail", msg: "Can't create comment", e });
  }
};
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const post = await Post.findById(comment.post);
    if (
      req.user.newUser._id != comment.commentor ||
      req.user.newUser._id != post.user
    ) {
      res
        .status(400)
        .json({
          status: "fail",
          msg: "You don't have permission to delete this comment",
          e,
        });
    }
    const index = post.comments.indexOf(comment._id);
    post.comments.splice(index, 1);
    await post.save();
    await Comment.deleteOne({ _id: comment._id });
    res.status(200).json({ status: "success", msg: "comment deleted" });
  } catch (e) {
    res.status(400).json({ status: "fail", msg: "Can't delete comment", e });
  }
};
