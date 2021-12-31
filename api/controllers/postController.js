const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find().populate("user", "username slug");
  res.status(200).json(posts);1
};
exports.getPost = async (req, res) => {
  const post = await Post.findOne(req.params.slug);
  res.status(200).json(post);
};
exports.getUserPosts = async (req, res) => {
  const slug = req.params.slug;
  const user = await User.findOne({ slug: slug });
  const posts = await Post.find({ user: user._id });
  res.status(200).json({ posts });
};
exports.createPost = async (req, res) => {
  try {
    let id = req.user.newUser._id;
    let { title, content } = req.body;
    const post = await Post.create({
      title: title,
      content: content,
      user: id,
    });
    const user = await User.findById(id);
    user.posts.push(post._id);
    await user.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({
      msg: "failed to create post",
      error,
    });
  }
};
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!(req.user.newUser._id == post.user)) {
      res
        .status(400)
        .json({ status: "fail", msg: "You can only delete your posts" });
    }
    await Comment.deleteMany({ post: post._id });
    const postUser = await User.findById(post.user);
    const index = postUser.posts.indexOf(post._id);
    postUser.posts.splice(index, 1);
    await postUser.save();
    await Post.deleteOne({ slug: req.params.slug });
    res.status(200).json({
      post: post,
      status: "success",
      msg: "Post successfully deleted",
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      msg: "failed to delete post",
      e: e,
    });
  }
};
