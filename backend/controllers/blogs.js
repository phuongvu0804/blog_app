const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");

//Routes for:
// - Home: display all the blog
// - Blog:
//     + Create new blog
//     + Display 1 blog
//     + Display blog by users

//Route for displaying all blogs
blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("author");
  res.json(blogs);
});

//Route for creating new blog
blogsRouter.post(
  "/",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (req, res, next) => {
    const { body } = req;

    const newBlog = new Blog({
      title: body.title,
      createdAt: body.createdAt,
      content: body.content,
      image: body.image,
      isLiked: body.isLiked,
      likes: body.likes ? body.likes : 0,
      comments: body.comments,
    });

    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: "Operation is not permitted" });
    }

    newBlog.author = user._id;

    try {
      let createdBlog = await newBlog.save();
      user.blogs = user.blogs.concat(createdBlog._id);
      await user.save();

      createdBlog = await Blog.findById(createdBlog._id).populate("author");

      res.status(201).json(createdBlog);
    } catch (exception) {
      next(exception);
    }
  }
);

//Route for displaying a detailed blog
blogsRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id).populate("author");
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

//Route for updating a blog
blogsRouter.put(
  "/:id",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    const author = req.user;

    const blog = await Blog.findById(id);
    if (!author || author._id?.toString() !== blog.author?.toString()) {
      return res.status(401).json({ error: "Operation is not permitted" });
    }
    const updatedBlog = await Blog.findOneAndUpdate({ _id: id }, update, {
      new: true,
    });

    if (updatedBlog) {
      return res.json(updatedBlog);
    } else {
      return res
        .status(404)
        .json({ error: "This blog is not existed in the system anymore" });
    }
  }
);

//Route for deleting a blog
blogsRouter.delete(
  "/:id",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (req, res) => {
    const id = req.params.id;
    const author = req.user;

    const blog = await Blog.findById(id);
    if (!author || author._id?.toString() !== blog.author?.toString()) {
      return res.status(401).json({ error: "Operation is not permitted" });
    }

    await Blog.deleteOne({ _id: id });
    res.status(204).end();
  }
);

module.exports = blogsRouter;
