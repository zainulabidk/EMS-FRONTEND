import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
 

const TopNavbar = () => {
  const menuData = [
    {
      path: '/',
      name: "Home",
    },
    {
      path: '/ ',
      name: "About",
    },
    {
      path: '/ ',
      name: "Services",
    },
    {
      path: '/ ',
      name: "Contact",
    }
  ]


  const usenavigate = useNavigate()

const handlclick = () => {
  usenavigate('/login')
}

  return (
    <Navbar expand="lg" className="navbar">
      <Container>
        <Navbar.Brand href="#home">
          INQ PORTAL
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto nav-link1">
            {menuData.map((item) => (
              <NavLink to={item.path} key={item.name} className="nav-link">
                {item.name}
              </NavLink>
            ))}
          </Nav>
          <Nav className='ms-auto' >
            <button className="btn btn-success" onClick={handlclick} >Login</button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
 
export default TopNavbar;