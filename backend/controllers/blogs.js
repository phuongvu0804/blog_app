const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

//Routes for:
// - Home: display all the blog
// - Blog:
//     + Create new blog
//     + Display 1 blog
//     + Display blog by users

//Route for displaying all blogs
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

//Route for creating new blog
blogsRouter.post('/', async (req, res, next) => {
  const { body } = req

  const newBlog = new Blog({
    title: body.title,
    createdAt: body.createdAt,
    content: body.content,
    image: body.image,
    isLiked: body.isLiked,
    likes: body.likes ? body.likes : 0,
    comments: body.comments,
  })

  const user = req.user

  if (!user) {
    return res.status(401).json({error: 'Operation is not permitted'})
  }

  newBlog.author = user._id

  try {
    let createdBlog = await newBlog.save()  
    user.blogs = user.blogs.concat(createdBlog._id)
    await user.save()
  
    createdBlog = await Blog.findById(createdBlog._id).populate('author')

    res.status(201).json(createdBlog)

  } catch (exception){
    console.log('running in  catch', exception)
    next(exception)
  }
})

//Route for displaying a detailed blog
blogsRouter.get('/:id', async (req, res) => {
  const id = req.params.id
  const blog = await Blog.findById(id)
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

//Route for updating a blog
blogsRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  const update = req.body
  const author = req.user

  const blog = await Blog.findById(id)
  if (!author || author._id?.toString() !== blog.author?.toString()) {
    return res.status(401).json({error: 'Operation is not permitted'})
  }
  const updatedBlog = await Blog.findOneAndUpdate({_id: id}, update, { new: true})
  res.json(updatedBlog)
})

//Route for deleting a blog
blogsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  const author = req.user

  const blog = await Blog.findById(id)
  if (!author || author._id?.toString() !== blog.author?.toString()) {
    return res.status(401).json({ error: 'Operation is not permitted'})
  }

  await Blog.deleteOne({ _id: id})
  res.status(204).end()
})

module.exports = blogsRouter
