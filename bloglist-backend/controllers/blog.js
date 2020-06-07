const blogsRouter = require('express').Router()
const BlogSchema = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', (request, response) => {
    BlogSchema
      .find({}).populate('user',{username:1,name:1,_id:1})
      .then(blogs => {
        response.json(blogs)
        console.log("get request",blogs)
      })
  })
  
blogsRouter.delete('/:id', (req, res, next) => {
    BlogSchema
        .findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
      .catch(error => next(error))
  })

blogsRouter.put('/:id', (request, response, next) => {
    const body = request.body
  
    const note = {
      title: body.title,
      author: body.author,
      likes: body.likes,
      url: body.url
    }
  
    BlogSchema.findByIdAndUpdate(request.params.id, note, { new: true })
      .then(updatedNote => {
        response.json(updatedNote.toJSON())
      })
      .catch(error => next(error))
  })
  
/*  
blogsRouter.post('/', (request, response,next) => {
    if (!request.body.title) {
        return response.status(400).json({
          error: 'Title missing'
        })
      }
    
      if (!request.body.url) {
        return response.status(400).json({
          error: 'Url missing'
        })
      }
      if (!request.body.author) {
        return response.status(400).json({
          error: 'Author missing'
        })
      }
    const blog = new BlogSchema(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      .catch(error => next(error))

  })
*/

/*
blogsRouter.post('/', (request, response,next) => {
    if (!request.body.title) {
        return response.status(400).json({
          error: 'Title missing'
        })
      }
    
      if (!request.body.url) {
        return response.status(400).json({
          error: 'Url missing'
        })
      }
      if (!request.body.author) {
        return response.status(400).json({
          error: 'Author missing'
        })
      }

    User.findById(request.body.userId)
    .then(userData => {
        const user = userData

        const newBlog = {
            title: request.body.title,
            author: request.body.author,
            url:request.body.url,
            likes:request.body.likes,
            user: user._id

        }
        console.log("newBlog.userId",newBlog.user)
        const blog = new BlogSchema(newBlog)

        blog
        .save()
        .then(result => {
            console.log("user???",user.blogs)

            user.blogs = user.blogs.concat(blog._id)
            user.save().then(res =>{ console.log("inside post request-user db")})
            response.status(201).json(result)
        })
        .catch(error => next(error))
    })
    .catch(error =>{ return response.status(400).json({
        error: 'Invalid user id'
      })})

})
*/

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }


  blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    console.log("id",body.userId)
    //const user = await User.findOne({ _id: body.userId })
    const token = getTokenFrom(request)

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
  
    const blog = new BlogSchema({
        title: request.body.title,
        author: request.body.author,
        url:request.body.url,
        likes:request.body.likes,
        user: user._id

    })
  
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    
    response.json(savedBlog.toJSON())
  })


module.exports = blogsRouter
