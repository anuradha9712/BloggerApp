import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import SignupService from './services/signup'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import Blog from './components/Blog'
import {Button} from 'react-bootstrap';

import './App.css'


const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [update, setUpdate] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)


    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [update])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])


    const Notification = ({ message }) => {
        if (message === null) {
            return <div></div>
        }

        return (
            <div className="error">
                {message}
            </div>
        )
    }


    const handleLogin = async (credentials) => {
        //event.preventDefault()
        try {
            const user = await loginService.login(credentials)

            window.localStorage.setItem(
                'loggedNoteappUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
        } catch (exception) {
            console.log("error")
            setErrorMessage('Wrong credentials')

            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleSignup = async (credentials) => {
        //event.preventDefault()
        try {
            const user = await SignupService.signup(credentials)

            window.localStorage.setItem(
                'loggedNoteappUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
        } catch (exception) {
            console.log("error")
            setErrorMessage('Username should be unique')

            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }



    const handleLogout = async (event) => {
        window.localStorage.removeItem('loggedNoteappUser')
        setUser(null)
    }

    const handleNewBlog = async (newBlog) => {
        try {
            createBlogFormRef.current.toggleVisibility()

            //const newBlog = {title:newTitle, author:newAuthor, url:newUrl}
            //console.log("user ID",user.id)
            await blogService.create(newBlog)

            //setBlogs(blogs.concat(newBlog))
            //setBlogs([...blogs, newBlog])
            blogService.getAll().then(blogs =>
                setBlogs(blogs)
            )

            console.log(newBlog)
            setErrorMessage('Successfully Added')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
        catch (exception) {
            setErrorMessage('Error')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const blogForm = () => (
        <div className="row">
            {blogs
                .sort((a, b) => b.likes - a.likes)
                .map(blog =>
                    <Blog key={blog.id} blog={blog} setUpdate={setUpdate} user={user} />
                )}
        </div>
    )

    const createBlogFormRef = React.createRef()

    return (
        <div className="outerDiv">
            {errorMessage !== null ? 
                <Notification message={errorMessage} /> :null
            }
            
            {user === null ?
                <LoginForm onlogin={handleLogin} onsignup={handleSignup} /> :
                (
                    <div>
                        <h3 style={{ textAlign: "center" }}>Blogger-App</h3>
                        <div className="row form" style={{float:"right"}}>
                            <p> Hello!! {user.name} logged in  {user.username}</p> &nbsp; &nbsp;
                            <Button variant="secondary" type="submit" id="logout" onClick={handleLogout}>logout</Button>
                        </div><br/> <br/>
                        <Togglable buttonLabel='New Note' ref={createBlogFormRef}>
                            <h2>Create a new Blog</h2>
                            <AddBlogForm onBlogAdded={handleNewBlog} />
                        </Togglable>

                        <br></br>
                        {blogForm()}
                    </div>
                )}
        </div>
    )
}

export default App