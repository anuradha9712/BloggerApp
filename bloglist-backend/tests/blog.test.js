const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'root',
          name: 'Superuser',
          password: 'salainen',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('`username` to be unique')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
  })


describe('when there is initially some blogs saved', () => {

        test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        })


        test('all blogs are returned', async () => {
            const response = await api.get('/api/blogs')
        
            expect(response.body.length).toBe(helper.initialBlogs.length)
        })
        
  
        test('a specific blog is within the returned blogs', async () => {
            const response = await api.get('/api/blogs')
        
            const contents = response.body.map(r => r.title)
        
            expect(contents).toContain('anuradha')
        })
})

/*
describe('viewing a specific blog', () => {

        test('a specific blog can be viewed', async () => {
            const blogsAtStart = await helper.blogsInDb()
          
            const blogToView = blogsAtStart[0]
          
            const resultBlog = await api
              .get(`/api/blogs/${blogToView.id}`)
              .expect(200)
              .expect('Content-Type', /application\/json/)
          
            expect(resultBlog.body).toEqual(blogToView)
          })
})
*/

describe('addition of a new note', () => {

        test('a valid blog can be added ', async () => {
            const newBlog = {
                "title": "mayank",
                "author": "myself",
                "url":"http://localhost/blfog",
                "likes":100
            }
        
            await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
            
            const contents = blogsAtEnd.map(n => n.title)
            expect(contents).toContain("mayank")
        })  

   
        test('a blog without likes can be added ', async () => {
            const newBlog = {
                "title": "blogWithoutlike",
                "author": "myself",
                "url":"http://localhost/blfog",
                
            }
        
            await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
            
            const contents = blogsAtEnd.map(n => n.title)
            expect(contents).toContain("blogWithoutlike")
        })  

  
        test('blog without title/url is not added', async () => {
            const newBlog = {
                "author": "blogWithoutTitleurl",
                "likes":100
            }
        
            await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
        
            const blogsAtEnd = await helper.blogsInDb()

            expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
        })
  
})  


describe('deletion of a blog', () => {

        test('a blog can be deleted', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]
        
            await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
        
            const blogsAtEnd = await helper.blogsInDb()
        
            expect(blogsAtEnd.length).toBe(
            helper.initialBlogs.length - 1
            )
        
            const contents = blogsAtEnd.map(r => r.title)
        
            expect(contents).not.toContain(blogToDelete.title)
        })
})


afterAll(() => {
  mongoose.connection.close()
})