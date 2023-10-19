const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const mongoose = require("mongoose");

//Routes for:
// - display all the users
// - User:
//     + User details

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate(["blogs", "savedBlogs"]);

  res.status(200).json(users);
});

usersRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id).populate(["blogs", "savedBlogs"]);

  if (!user) {
    return res.status(400).json({ error: "Not Found" });
  }

  res.status(200).send(user);
});

usersRouter.post("/", async (req, res, next) => {
  const { name, username, password } = req.body;

  if (!username || username.length < 3) {
    return res.status(400).json({
      error: "`password` is shorter than the minimum allowed length (3)",
    });
  }

  if (!name || name.length < 3) {
    return res.status(400).json({
      error: "`password` is shorter than the minimum allowed length (3)",
    });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({
      error: "`password` is shorter than the minimum allowed length (6)",
    });
  }

  const saltRounds = 10;

  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (exception) {
    next(exception);
  }
});

usersRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;

  await User.deleteOne({ _id: id });
  res.status(204).end();
});

usersRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const blogId = req.body.blogId;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ error: "This user no longer exists in the system" });
    }

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ error: "Invalid blogId" });
    }

    const parsedObjectId = new mongoose.Types.ObjectId(blogId);

    // Check if blog has been saved
    const userObject = user.toObject();
    const updatedUser = { ...userObject };

    const isSavedBlog = userObject.savedBlogs.some(
      (savedBlog) => savedBlog.toString() === parsedObjectId.toString()
    );

    if (isSavedBlog) {
      updatedUser.savedBlogs = userObject.savedBlogs.filter(
        (item) => item.toString() !== parsedObjectId.toString()
      );
    } else {
      updatedUser.savedBlogs = [...userObject.savedBlogs, parsedObjectId];
    }

    const result = await User.findByIdAndUpdate(id, updatedUser, {
      new: true,
    }).populate(["blogs", "savedBlogs"]);

    return res.json(result);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while updating the user" });
  }
});

module.exports = usersRouter;
