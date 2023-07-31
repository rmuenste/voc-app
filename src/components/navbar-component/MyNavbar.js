import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
//import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector } from 'react-redux';

const MyNavbar = () => {

  const [expanded, setExpanded] = useState(false);

  const userLoggedIn = useSelector((state) => state.auth.loggedIn);

  const toggleNavbar = () => {
    setExpanded(!expanded);
  }

    return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <NavLink to="/" className="nav-style">
                Login
                </NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink to="/register" className="nav-style">
                  Register
                </NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink to="/query" className="nav-style">
                Query
                </NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink to="/configure" className="nav-style">
                Trainer
                </NavLink>
              </Nav.Link>
              {userLoggedIn ? 
                (
                <Nav.Link>
                  <NavLink to="/profile" className="nav-style">
                  Profile
                  </NavLink>
                </Nav.Link>
                ) :
                (
                  null
                )
              }
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
    );
};

export default MyNavbar;
