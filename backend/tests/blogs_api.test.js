const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helpers = require('./test_helpers')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany()
  await Blog.insertMany(helpers.initialBlogs)

})

describe('When there are blogs saved,', () => {
  //Correct number of blogs in JSON
  test('correct number of blogs in JSON will be returned', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    expect(response.body).toHaveLength(helpers.initialBlogs.length)
    
  })
  
  //Viewing a specific blog
  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helpers.blogsInDb()
    const blogToView = blogsAtStart[0]

    const response = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    expect(response.body.content).toEqual(blogToView.content)
  })

  //ID field
  test('all blogs have field id', async () => {
    const response = await api
      .get('/api/blogs')
    
    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })
})

//Creation of a blog
describe('When a new blog', () => {
  let authHeader

  beforeEach(async () => {
    await User.deleteMany()

    const user = helpers.initialUsers[0]
    user.name = 'secretUser'
    await api.post('/api/users').send(user)
    const response = await api.post('/api/login').send(user)
    authHeader = `Bearer ${response.body.token}`
  })

  test('can be added', async () => {
    const blog = {
      title: 'Async/await in the backend',
      author: 'fullstackopen',
      url: 'https://fullstackopen.com/en/part4/testing_the_backend#async-await-in-the-backend',
      content: 'As all of the asynchronous operations are currently done inside of a function, it is enough to change the route handler functions into async functions.',
      comments: [],
    }
    
    const blogsAtStart = await helpers.blogsInDb()
    await api
      .post('/api/blogs')
      .set('Authorization', authHeader)
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helpers.blogsInDb()

    const titles = blogsAtEnd.map(blog => blog.title)

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
    expect(titles).toContain(blog.title)
  })

  test('without content is not added', async () => {
    const blog = {
      title: 'Async/await in the backend',
      author: 'fullstackopen',
      url: 'https://fullstackopen.com/en/part4/testing_the_backend#async-await-in-the-backend',
      image: 'https://www.cardscanner.co/assets/new-img/img-to-text-og.png',
      comments: [],
    }

    await api
      .post('/api/blogs')
      .set('Authorization', authHeader)
      .send(blog)
      .expect(400)  
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helpers.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helpers.initialBlogs.length)
  })

  test('is missing title, creation fails', async () => {
    const blog = {
      author: 'fullstackopen',
      url: 'https://fullstackopen.com/en/part4/testing_the_backend#async-await-in-the-backend',
      content: 'As all of the asynchronous operations are currently done inside of a function, it is enough to change the route handler functions into async functions.',
      image: 'https://www.cardscanner.co/assets/new-img/img-to-text-og.png',
      comments: [],
    }

    await api
      .post('/api/blogs')
      .set('Authorization', authHeader)
      .send(blog)
      .expect(400)  
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helpers.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helpers.initialBlogs.length)
    
  })

  test('does not have initial value for likes, like property is set to 0', async () => {
    const blog = {
      title: 'Async/await in the backend',
      url: 'https://fullstackopen.com/en/part4/testing_the_backend#async-await-in-the-backend',
      content: 'As all of the asynchronous operations are currently done inside of a function, it is enough to change the route handler functions into async functions.',
      image: 'https://www.cardscanner.co/assets/new-img/img-to-text-og.png',
      comments: [],
    }

    const result = await api 
      .post('/api/blogs')
      .send(blog)
      .set('Authorization', authHeader)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(result.body.likes).toBe(0)
  }, 10000)
})

describe('A blog', () => {
  let authHeader
  let blogId

  const blog = {
    title: 'Async/await in the backend',
    url: 'https://fullstackopen.com/en/part4/testing_the_backend#async-await-in-the-backend',
    content: 'As all of the asynchronous operations are currently done inside of a function, it is enough to change the route handler functions into async functions.',
    image: 'https://www.cardscanner.co/assets/new-img/img-to-text-og.png',
    comments: [],
  }
  
  beforeEach(async () => {
    await User.deleteMany()

    const user = helpers.initialUsers[0]
    user.name = 'secretUser'
    await api.post('/api/users').send(user)
    const response = await api.post('/api/login').send(user)
    authHeader = `Bearer ${response.body.token}`

    const createdBlog = await api
      .post('/api/blogs/')
      .set('Authorization', authHeader)
      .send(blog)
    blogId = createdBlog.body.id
  })

  //Deletion of a blog
  describe('can', () => {
    test('be deleted by the creator', async () => {
      //User deletes his own blog
      const blogsAtStart = await helpers.blogsInDb()
      await api
        .delete(`/api/blogs/${blogId}`)
        .set('Authorization', authHeader)
        .expect(204)
      
      const blogsAtEnd = await helpers.blogsInDb()
      const titles = blogsAtEnd.map(blog => blog.title)
  
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
      expect(titles).not.toContain(blog.title)
    })
  
    test('not be deleted by a different user', async () => {
      const blogsAtStart = await helpers.blogsInDb()
      const blogToDelete = blogsAtStart[0]
  
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', authHeader)
        .expect(401)
      
      const blogsAtEnd = await helpers.blogsInDb()
      const titles = blogsAtEnd.map(blog => blog.title)
  
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
      expect(titles).toContain(blogToDelete.title)
    })
  })

  //Updation of a blog
  describe('can', () => {
    test('be edited by its own creator', async () => {
      const updatedblog = {...blog}
      updatedblog.title = 'Backend and Async/await'

      const blogsAtStart = await helpers.blogsInDb()

      await api
        .put(`/api/blogs/${blogId}`)
        .set('Authorization', authHeader)
        .send(updatedblog)
        .expect(200)
      
      const blogsAtEnd = await helpers.blogsInDb()
      const titles = blogsAtEnd.map(blog => blog.title)
      expect(titles).toContain(updatedblog.title)
      expect(titles).not.toContain(blog.title)
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    })

    test('not be edited by another creator', async () => {
      const blogToUpdate = {...helpers.initialBlogs[0]}
      const newTitle = 'Introduction about React'
      blogToUpdate.title = newTitle

      const blogsAtStart = await helpers.blogsInDb()

      await api
        .put(`/api/blogs/${blogToUpdate._id}`)
        .set('Authorization', authHeader)
        .send(blogToUpdate)
        .expect(401)
      
      const blogsAtEnd = await helpers.blogsInDb()
      const titles = blogsAtEnd.map(blog => blog.title)
      expect(titles).toContain(helpers.initialBlogs[0].title)
      expect(titles).not.toContain(newTitle)
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
      
    })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})