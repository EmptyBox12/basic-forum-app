const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find();
  res.status(200).json(posts);
};
exports.getPost = async (req, res) => {
  const post = await Post.findOne(req.params.slug);
  res.status(200).json(post);
};
exports.createPost = async (req, res) => {
  try {
    let id = req.user.newUser._id;
    let { title, content } = req.body;
    console.log(id, title, content);
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
  const post = await Post.deleteOne(req.params.slug);
  //delete all comments
  //delete post from user
};
