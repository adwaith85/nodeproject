import { Link } from "react-router-dom"
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
  // const getData=async()=>{
  //     let res=await fetch(`http://localhost:8000/products?search=${searchItem}`)
  //     let data=await res.json()
  //     SetData(data)
  // }
  // useEffect(()=>{
  //     getData()
  // },[searchItem])

  const location = useLocation()

  console.log("location", location.pathname)
  
  return <>
    <Navbar expand="md" className="bg-primary" variant="dark">
      <Container fluid className="toggle">

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" >
          <Nav
            className="navcontent"
            style={{ maxHeight: '200px' }}
            navbarScroll
          >
            <Link to={'/'} className="nav-link">HOME</Link>
            <Link to={'/cart'} className="nav-link">CART</Link>
            <Link to={'/admin'} className="nav-link">ADMIN</Link>
            
            <Link to={'/Categories'} className="nav-link">CATEGORY</Link>
        

        
          </Nav>
          <NavLink showOn={[
            "/",
          ]}>
            <Form className="navsearch">
              <Form.Control
                onChange={(e) => SetSearchItem(e.target.value)}
                type="search"
                placeholder="Search"
                className=""
                aria-label="Search"
              />
              <Button variant="outline-success" style={{margin:"auto"}}>Search</Button>
            </Form>
          </NavLink>
        </Navbar.Collapse>


          <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="auth-link">
              {!token?(
              <Link to={'/Login'} className="nav-link">LOGIN</Link>
            ):<button className="nav-link ad" onClick={() => {


                removeToken()
                // alert("loged out")
              }}>LOGOUT</button> 
            }
          </Navbar.Text>
        </Navbar.Collapse>


      </Container>
    </Navbar>


  </>
}


export default Header