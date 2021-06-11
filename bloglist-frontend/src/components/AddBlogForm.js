import React, { useState } from 'react'
import { useField } from '../hooks';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // ES6



const AddBlogForm = ({ onBlogAdded }) => {
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");

  const [content, setContent] = useState('');

  const handleNewBlogSubmit = e => {
    e.preventDefault()
    onBlogAdded({
      title: title.value,
      author: author.value,
      // url: url.value
      url: content
    })

    title.reset();
    author.reset();
    // url.reset();
  }

  const handleChange = (value) => {
    console.log("vallluueee--> ", value)
    setContent(value);

  }

  const modules = {
    toolbar: {
      container: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean'], ['code-block']
      ],
    },
    clipboard: {
      matchVisual: false,
    },
  }

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
    'code-block',
  ]


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

        {/* <Form.Group controlId="url">
          <Form.Label>Content</Form.Label>
          <Form.Control type="text" {...url} reset="" placeholder="Enter URL" />
        </Form.Group> */}


        {/* <ReactQuill
          // value={content.rawValue || content.value || ''}
          value='<h1>hello world</h1>'
          onChange={rawValue => {
            const cleanedValue = rawValue.replace(/<p><br><\/p>/g, '');
            // setContent({ rawValue, value: cleanedValue });
            handleChange(cleanedValue);
          }}
        /> */}

       <ReactQuill
        value={content}
        theme="snow"
        onChange={handleChange}
        modules={modules}
        formats={formats}
      /> 


        <Button variant="primary" type="submit" id="create-button">Create</Button>
      </Form>


    </div>
  )
}


AddBlogForm.propTypes = {
  onBlogAdded: PropTypes.func.isRequired
}

export default AddBlogForm