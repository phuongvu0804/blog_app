const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/user");
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate([
    "blogs",
    "savedBlogs",
    "likedBlogs",
  ]);

  res.status(200).json(users);
});

usersRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id).populate([
    "blogs",
    "savedBlogs",
    "likedBlogs",
  ]);

  if (!user) {
    return res.status(400).json({ error: "Not Found" });
  }

  res.status(200).send(user);
});

usersRouter.post("/", async (req, res, next) => {
  const { name, username, password, description } = req.body;

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

  const imageBuffer = req.file.buffer;
  const contentType = req.get("Content-Type");

  const user = new User({
    username,
    name,
    passwordHash,
    description,
    image: {
      data: imageBuffer,
      contentType,
    },
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

usersRouter.put(
  "/save/:blogId",
  middleware.convertToObjectId("blogId"),
  middleware.validateUserId,
  async (req, res) => {
    const blogId = req.params.blogId;
    const userId = req.body.userId;
    const { user } = req;
    try {
      // Check if blog has been saved
      const userObject = user.toObject();
      const updatedUser = { ...userObject };

      const isSavedBlog = userObject.savedBlogs.some(
        (savedBlog) => savedBlog.toString() === blogId.toString()
      );

      if (isSavedBlog) {
        updatedUser.savedBlogs = userObject.savedBlogs.filter(
          (item) => item.toString() !== blogId.toString()
        );
      } else {
        updatedUser.savedBlogs = [...userObject.savedBlogs, blogId];
      }

      const result = await User.findByIdAndUpdate(userId, updatedUser, {
        new: true,
      }).populate(["blogs", "savedBlogs", "likedBlogs"]);

      return res.json(result);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred while updating the user" });
    }
  }
);

usersRouter.put(
  "/like/:blogId",
  middleware.convertToObjectId("blogId"),
  middleware.validateBlogId,
  middleware.validateUserId,
  async (req, res) => {
    const blogId = req.params.blogId;
    const userId = req.body.userId;
    const { user, blog } = req;

    try {
      const userObject = user.toObject();
      const blogObject = blog.toObject();

      const updatedUser = { ...userObject };
      const updatedBlog = { ...blogObject };

      //Check if blog has been liked before
      const isLiked = userObject.likedBlogs.some(
        (likedBlogId) => likedBlogId.toString() === blogId.toString()
      );

      if (isLiked) {
        updatedUser.likedBlogs = userObject.likedBlogs.filter(
          (likedBlogId) => likedBlogId.toString() !== blogId.toString()
        );

        if (updatedBlog.likes) {
          updatedBlog.likes = blogObject.likes.filter(
            (likedUserId) => likedUserId.toString() !== userId.toString()
          );
        }
      } else {
        updatedUser.likedBlogs = [...userObject.likedBlogs, blogId];

        if (updatedBlog.likes) {
          updatedBlog.likes = [...blogObject.likes, userId];
        } else {
          updatedBlog.likes = [userId];
        }
      }

      await Blog.findByIdAndUpdate(blog._id, updatedBlog, {
        new: true,
      });

      const result = await User.findByIdAndUpdate(userId, updatedUser, {
        new: true,
      });

      return res.json(result);
    } catch (error) {
      console.error(error);

      return res
        .status(500)
        .json({ error: "An error occurred while updating the user" });
    }
  }
);

module.exports = usersRouter;
