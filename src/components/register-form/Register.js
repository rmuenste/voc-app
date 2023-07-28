import React, { useState, useContext } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext'; 
import './Register.css'

function RegisterForm() {

  const [formData, setFormData] = React.useState(
  {
    regUserName: "",
    regUserPassword: "",
    regUserEmail: "",
    logUserName: "",
    logUserPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const navigate = useNavigate();

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
      username: formData.regUserName,
      password: formData.regUserPassword,
      email: formData.regUserEmail
    };

    try {
      const response = await axios.post('http://localhost:5001/api/user/register', data, {
        withCredentials: true
      });
      console.log(response);
      if (response.data.loggedIn) {
        setIsLoggedIn(true);
        return navigate("/welcome");
      }
      else {
        setIsLoggedIn(false);
      }

    } catch (error) {
      console.error('Error:', error);
    }

  }
  
  return (
       <Container className="d-flex justify-content-center mycard">
       <Card style={{ width: '18rem', textAlign: 'center' }}>
       <Card.Body>
           <Card.Title>Register User</Card.Title>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>User name</Form.Label>
            <Form.Control 
                  type="text" 
                  onChange={handleChange}
                  placeholder="myUserName"
                  aria-label="login input"
                  name="regUserName"
                  value={formData.regUserName}
            />
            <Form.Label style={{marginTop: '10px'}}>Password</Form.Label>
            <InputGroup>
            <Form.Control 
                  type={showPassword ? 'text' : 'password'}
                  onChange={handleChange}
                  placeholder="myPassword"
                  aria-label="password input"
                  name="regUserPassword"
                  value={formData.regUserPassword}
            />
            <Button
              variant="outline-none"
              onClick={togglePasswordVisibility}
              style={{ marginLeft: '5px' }}
            >
            {showPassword ? (<FaEyeSlash/>) : (<FaEye/>)}
          </Button>
            </InputGroup>
            <Form.Label style={{marginTop: '10px'}}>Email</Form.Label>
            <Form.Control 
                  type="email" 
                  onChange={handleChange}
                  placeholder="MyEmail"
                  aria-label="email input"
                  name="regUserEmail"
                  value={formData.regUserEmail}
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

export default RegisterForm;