const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const slugify = require("slugify");


const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique:true,
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
  slug: {
    type: String,
    unique: true,
  },
});
UserSchema.pre("validate", function (next) {
  this.slug = slugify(this.username, {
    lower: true,
    strict: true,
  });
  next();
});
UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(user.password, salt, function (err, hash) {
      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
