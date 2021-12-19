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
