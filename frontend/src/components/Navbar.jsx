import { Link } from "react-router-dom"
import './Navbar.css'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import NavLink from "./NavLink";

import AuthStore from "../AuthStore";

function Header({ SetSearchItem }) {
  const { removeToken, token } = AuthStore()
  const location = useLocation()

  return (
    <Navbar expand="lg" className="navbar" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          Shop<span>Cart</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0 navcontent" navbarScroll>
            <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
            <Nav.Link as={Link} to="/Categories" className="nav-link">Categories</Nav.Link>
            {token && (
              <>
                <Nav.Link as={Link} to="/cart" className="nav-link">Cart</Nav.Link>
                <Nav.Link as={Link} to="/order" className="nav-link">Orders</Nav.Link>
                <Nav.Link as={Link} to="/admin" className="nav-link">Admin</Nav.Link>
              </>
            )}
          </Nav>

          <NavLink showOn={["/"]}>
            <Form className="d-flex navsearch">
              <Form.Control
                onChange={(e) => SetSearchItem(e.target.value)}
                type="search"
                placeholder="Search for products..."
                aria-label="Search"
              />
            </Form>
          </NavLink>

          <div className="auth-link">
            {!token ? (
              <Link to="/Login" className="nav-link">Login</Link>
            ) : (
              <button className="nav-link ad" onClick={removeToken}>Logout</button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header