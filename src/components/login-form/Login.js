import { useState, useContext } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import { useSelector, useDispatch } from 'react-redux';

import './Login.css'

function LoginForm() {

  const [formData, setFormData] = useState(
  {
    regUserName: "",
    regUserPassword: "",
    logUserName: "",
    logUserPassword: ""
  });

  const userLoggedIn = useSelector((state) => state.auth.loggedIn);

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

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
      if (response.data.loggedIn) {
        if (!userLoggedIn) {
          dispatch({type: 'auth/login', payload: true});
        }
        console.log("Hello logged in user.");
        return navigate("/welcome");
      } else {
        dispatch({type: 'auth/login', payload: false});
      }

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
          <InputGroup>
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            onChange={handleChange}
            placeholder="myPassword"
            aria-label="password input"
            name="logUserPassword"
            value={formData.logUserPassword}
          />
          <Button
            variant="outline-none"
            onClick={togglePasswordVisibility}
            style={{ marginLeft: '5px' }}
          >
            {showPassword ? (<FaEyeSlash/>) : (<FaEye/>)}
          </Button>
        </InputGroup>
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