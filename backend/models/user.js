const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    require: true,
    unique: true,
  },
  name: {
    type: String,
    minLength: 3,
    require: true,
  },
  description: {
    type: String,
    minLength: 10,
    maxLength: 200,
  },
  passwordHash: {
    type: String,
    require: true,
    minLength: 6,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
  savedBlogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
  likedBlogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
  image: {
    data: Buffer,
    contentType: String,
  },
});

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = doc._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.passwordHash;
  },
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
