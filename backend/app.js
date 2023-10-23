const express = require("express");
const app = express();
const multer = require("multer");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");
const config = require("./utils/config");
const logger = require("./utils/logger");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

mongoose.set("strictQuery", false);

logger.info("connecting to", process.env.NODE_ENV, config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connected to mongo");
  })
  .catch((error) => {
    logger.error("Error connected to mongo", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(express.static("build"));

app.use("/api/blogs", blogsRouter);
app.use("/api/users", upload.single("image"), usersRouter);
app.use("/api/login", loginRouter);
app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

module.exports = app;
