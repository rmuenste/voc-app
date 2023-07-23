import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import './Login.css'

function LoginForm() {

  const [formData, setFormData] = React.useState(
  {
    regUserName: "",
    regUserPassword: "",
    logUserName: "",
    logUserPassword: ""
  });

  const handleChange = (event) => {
    const {name, value, type, checked} = event.target;
    console.log(name);
    setFormData( prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);

    const data = {
      username: formData.logUserName,
      password: formData.logUserPassword
    };

    try {
      const response = await axios.post('http://localhost:5001/api/user/login', data, {
        withCredentials: true
      });
      console.log(response);
    } catch (error) {
      console.error('Error:', error);
    }

  }
  
  return (
       <Container className="d-flex justify-content-center mycard">
       <Card style={{ width: '18rem', textAlign: 'center' }}>
       <Card.Body>
           <Card.Title>Login</Card.Title>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>User name</Form.Label>
            <Form.Control 
                  type="text" 
                  onChange={handleChange}
                  placeholder="myUserName"
                  aria-label="login input"
                  name="logUserName"
                  value={formData.logUserName}
            />
            <Form.Label style={{marginTop: '10px'}}>Password</Form.Label>
            <Form.Control 
                  type="text" 
                  onChange={handleChange}
                  placeholder="myPassword"
                  aria-label="password input"
                  name="logUserPassword"
                  value={formData.logUserPassword}
            />
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
      </Form>
      </Card.Body>
      </Card>
      </Container>
  );
}

export default LoginForm;