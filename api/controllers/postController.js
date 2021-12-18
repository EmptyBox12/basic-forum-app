const jwt = require("jsonwebtoken");
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

exports.getAllPosts = (req, res) => {
  const posts = await Post.find();
  res.send(200).json(posts);
};
exports.getPost = (req, res) => {
  const post = await Post.findOne(req.params.slug);
  res.send(200).json(post);
};
exports.createPost = (req, res) => {
  try {
    let jwt = req.get("Token");
    //decode jwt
    let id = jwt.userID;
    const post = await Post.create({ ...req.body, id });
    const user = await User.findById(id);
    user.posts.push(post._id);
    await user.save();
    res.send(201).json(post);
  } catch (error) {
    res.status(400).json({
      msg: "failed create post",
      e,
    });
  }
};
exports.deletePost = (req, res) => {
  const post = await Post.deleteOne(req.params.slug);
  //delete all comments
  //delete post from user
};
