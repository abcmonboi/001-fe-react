import React from "react";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/images/logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";

function Header(props) {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);
  const handleLogout = () => {
    if (user && user.auth === true) {
      logout();
      toast.success("Logout successfully");
      navigate("/login");
    }
  };
  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      expand="lg"
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand>
          <NavLink
            style={{
              textDecoration: "none",
            }}
            className="text-white "
            to="/"
          >
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
        <Navbar.Toggle hidden={!user?.auth}  aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        {(user.auth || window.location.pathname === "/") && (
              <>
                <Nav className="me-auto">
                  <NavLink to="/" className="nav-link" activeclassname="active">
                    Home
                  </NavLink>
                  {user && user.email && (
                    <NavLink
                      to="/users"
                      className="nav-link"
                      activeclassname="active"
                    >
                      Manage User
                    </NavLink>
                  )}
                </Nav>
                <Nav>
                  {user && user.email && (
                    <span className="nav-link text-white">
                      {"Hello "}
                      {user && user.email.toUpperCase().split("@")[0]}
                    </span>
                  )}
                  <NavDropdown title="Settings" id="basic-nav-dropdown">
                    {user && user.auth === true ? (
                      <>
                        <NavDropdown.Item onClick={() => handleLogout()}>
                          Logout
                        </NavDropdown.Item>
                      </>
                    ) : (
                      <NavDropdown.Item onClick={() => navigate("/login")}>
                        Login
                      </NavDropdown.Item>
                    )}
                  </NavDropdown>
                </Nav>
              </>
            )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
