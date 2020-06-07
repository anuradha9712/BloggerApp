import React from 'react'
import { useField } from '../hooks';
//import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';



const LoginForm = ({ onlogin, onsignup }) => {

    const username = useField('text');
    const password = useField('password');
    const Newusername = useField('text');
    const name = useField('text');
    const Newpassword = useField('text');

    const handleLogin = e => {
        e.preventDefault()
        onlogin({
            username: username.value,
            password: password.value
        })
    }

    const handleSignup = e => {
        e.preventDefault()
        onsignup({
            username: Newusername.value,
            name: name.value,
            password: Newpassword.value
        })
    }

    return (
        <div className="outerDiv">
            <h3 style={{ textAlign: "center" }}>Blogger-App</h3>
            <br /> <br />
            <div className="row">
                <div className="col-md-5 form">
                    <h3>LOGIN</h3>

                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" {...username} reset="" placeholder="Enter username" />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" {...password} reset="" placeholder="Enter Password" />
                        </Form.Group>

                        <Button variant="primary" type="submit" id="login-button">Login</Button>
                    </Form>
                </div>
                <div className="col-md-2"></div>

                <div className="col-md-5 form">
                    <h3>SIGN-UP</h3>
                    <Form onSubmit={handleSignup}>
                        <Form.Group controlId="Newusername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" {...Newusername} reset="" placeholder="Enter username" />
                            <Form.Text className="text-muted">
                                Username must be unique.
                        </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" {...name} reset="" placeholder="Enter name" />
                        </Form.Group>

                        <Form.Group controlId="Newpassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" {...Newpassword} reset="" placeholder="Enter Password" />
                        </Form.Group>

                        <Button variant="primary" type="submit" id="signup-button">Signup</Button>
                    </Form>

                </div>


            </div>
        </div>
    )
}
/*
LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired

}*/
export default LoginForm