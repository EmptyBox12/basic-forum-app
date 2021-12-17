const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});
UserSchema.pre("save", function (next) {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(this.password, salt, function (err, hash) {
      this.password = hash;
      next();
    });
  });
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
