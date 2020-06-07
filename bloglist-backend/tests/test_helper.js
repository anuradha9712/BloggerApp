const Blog = require('../models/blog')
const User = require('../models/user')

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }
  

  
const initialBlogs = [
  {
    "title": "harshita",
    "author": "myself",
    "url":"http://localhost/blfog",
    "likes":100
  },
  {
    "title": "anuradha",
    "author": "me",
    "url":"http://localhost/blfog",
    "likes":50
  }
]

const nonExistingId = async () => {
  const note = new Blog({ title: 'willremovethissoon' })
  await note.save()
  await note.remove()

  return note._id.toString()
}

const blogsInDb = async () => {
  const notes = await Blog.find({})
  return notes.map(note => note.toJSON())
}

module.exports = {
  initialBlogs, 
  nonExistingId, 
  blogsInDb,
  usersInDb
}