import React, { useState, useImperativeHandle } from 'react';
import { Button} from 'react-bootstrap';

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div  className="col-md-6 form">
      <div style={hideWhenVisible}>
        <Button variant="primary" type="submit" id="create-button" onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>

      <div style={showWhenVisible} className="togglableContent">
        {props.children} <br/>
        <Button variant="primary" type="submit" id="create-button" onClick={toggleVisibility}>Cancel</Button>

      </div>
    </div>
  )
})

export default Togglable