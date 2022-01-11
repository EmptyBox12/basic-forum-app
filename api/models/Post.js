const mongoose = require("mongoose");
const slugify = require("slugify");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  slug: {
    type: String,
    unique: true,
  },
});

PostSchema.pre("validate", function (next) {
  this.slug = slugify(this.title, {
    lower: true,
    strict: true,
  });
  next();
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;