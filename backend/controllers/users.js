const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

//Routes for:
// - display all the users
// - User:
//     + User details

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    comments: 1,
    title: 1,
    author: 1,
    url: 1,
    isLiked: 1,
    id: 1,
  });

  res.status(200).json(users);
});

usersRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id).populate("blogs", {
    comments: 1,
    title: 1,
    author: 1,
    url: 1,
    isLiked: 1,
    id: 1,
  });

  if (!user) {
    return res.status(400).json({ error: "Not Found" });
  }

  res.status(200).send(user);
});

usersRouter.post("/", async (req, res, next) => {
  const { name, username, password } = req.body;

  if (!password || password.length < 3) {
    return res.status(400).json({
      error: "`password` is shorter than the minimum allowed length (3)",
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

module.exports = usersRouter;
