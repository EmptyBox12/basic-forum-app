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
  const post = await Post.create(req.body);
  let jwt = req.get("Token");
  //decode jwt
  let id = jwt.userID;
  const user = await User.findById(id);
  user.posts.concat(post._id);
  res.send(201).json(post);
};
exports.deletePost = (req, res) => {
  const post = await Post.deleteOne(req.params.slug);
  //delete all comments
};
