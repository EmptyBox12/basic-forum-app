const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },  
  commentor: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;