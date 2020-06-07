import React from 'react'
import {useField} from '../hooks';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';



const AddBlogForm = ({ onBlogAdded }) => {
    const title = useField("text");
    const author = useField("text");
    const url = useField("text");

    const handleNewBlogSubmit = e => {
        e.preventDefault()
        onBlogAdded({
          title: title.value,
          author: author.value,
          url: url.value
        })
        title.reset();
        author.reset();
        url.reset();
      }

      return (
        <div>
             <Form onSubmit={handleNewBlogSubmit}>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" {...title} reset="" placeholder="Enter Title" />
                        </Form.Group>

                        <Form.Group controlId="Author">
                            <Form.Label>Author</Form.Label>
                            <Form.Control type="text" {...author} reset="" placeholder="Enter Author" />
                        </Form.Group>

                        <Form.Group controlId="url">
                            <Form.Label>URL</Form.Label>
                            <Form.Control type="text" {...url} reset="" placeholder="Enter URL" />
                        </Form.Group>

                        <Button variant="primary" type="submit" id="create-button">Create</Button>
                    </Form>
        </div>
      )
    }


    AddBlogForm.propTypes = {
        onBlogAdded: PropTypes.func.isRequired
    }
    
    export default AddBlogForm