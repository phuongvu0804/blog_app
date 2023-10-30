const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Blog = require("../models/blog");
const mongoose = require("mongoose");

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "Unknown endpoint" });
};

const errorHandler = (err, req, res, next) => {
  if (err.name === "CastError") {
    return res.status(400).send({ error: "Malformatted id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).send({ error: err.message });
  } else if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      error: "Invalid token",
    });
  } else if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      error: "Token expired",
    });
  }

  next();
};

const getTokenFrom = (req) => {
  const authorization = req.get("Authorization");
  if (authorization && authorization.startsWith("Bearer")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

const tokenExtractor = (req, res, next) => {
  req.token = getTokenFrom(req);

  next();
};

const userExtractor = async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);

  if (!decodedToken.id) {
    req.user = null;
  } else {
    const user = await User.findById(decodedToken.id);
    req.user = user;
  }
  next();
};

const validateBlogId = async (req, res, next) => {
  const blogId = req.params.blogId;

  const blog = await Blog.findById(blogId);
  if (!blog) {
    return res.status(404).json({ error: "Blog not found" });
  }

  req.blog = blog;

  next();
};

const validateUserId = async (req, res, next) => {
  const userId = req.body.userId;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user id" });
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  req.user = user;

  next();
};

const convertToObjectId = (paramName) => {
  return (req, res, next) => {
    const id = req.params[paramName];

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    req.params[paramName] = new mongoose.Types.ObjectId(id);

    next();
  };
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
  validateBlogId,
  validateUserId,
  convertToObjectId,
};
