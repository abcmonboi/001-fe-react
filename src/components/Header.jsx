import React from "react";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/images/logo.svg";
import { NavLink,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Header(props) {
  const navigate =useNavigate();
  const handleLogout = () =>{
    localStorage.removeItem("token");
    toast.success("Log out successfully");
    navigate("/");

  }
  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      expand="lg"
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand>
        <NavLink style={({
          textDecoration: 'none'
        })} className="text-white "  to="/">
         
          <img
            alt="logo"
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          <span> React ABootstrap</span>
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/users">
              Manage User
            </NavLink>
          </Nav>
          <Nav>
            <NavLink className="nav-link" to="/sign-in">
              Log in
            </NavLink>
            <NavLink className="nav-link" onClick={()=>handleLogout()}>
              Log out
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
