import React from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types';
import { Button,Card } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';


const Blog = ({ blog, setUpdate, user }) => {

    const incLikes = async (event) => {
        event.preventDefault()
        const likes = blog.likes + 1
        const newBlog = { ...blog, likes }
        await blogService.update(blog.id, newBlog)
        setUpdate(Math.floor(Math.random() * 100))

    }

    const remove = async event => {
        event.preventDefault()

        if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
            //blogService.setToken(user.token)
            await blogService.remove(blog.id)
            setUpdate(Math.floor(Math.random() * 100))
        }
    }


    return (
            <div style={{margin:"10px"}}>
                <br/><br/>
                <Card border="primary" style={{ width: '18rem' }}>
                    <Card.Header>{blog.title}</Card.Header>

                    <Card.Body>
                        <Card.Title>{blog.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">added by {blog.author}</Card.Subtitle>
                        <Card.Text>
                            
                            {/* <Card.Link href="#">{blog.url}</Card.Link> <br/> */}
                            {ReactHtmlParser(blog.url)}

                            ❤️Likes: {blog.likes} &nbsp; &nbsp;
                            <Button variant="info" onClick={incLikes} type="submit" id="like-button">Like</Button><br />
                            {blog.user.username === user.username ?
                                <Button variant="danger" type="submit" onClick={remove} id="remove-button">Remove</Button>
                             : null }
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}
export default Blog
