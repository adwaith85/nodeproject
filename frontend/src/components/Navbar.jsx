import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";

function Header({SetSearchItem}){
  

    

    // const getData=async()=>{

    
    //     let res=await fetch(`http://localhost:8000/products?search=${searchItem}`)
        
    //     let data=await res.json()

    //     SetData(data)

    // }

    // useEffect(()=>{
    //     getData()

    // },[searchItem])
  
   

    const location=useLocation()

    console.log("location",location.pathname)

    return <>
             <Navbar  expand="lg" className="bg-body-tertiary">
      <Container fluid style={{backgroundColor:"#a48888ff",height:"60px"}}>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '200px' }}
            navbarScroll
          >
            <Link to={'/'} className="nav-link">HOME</Link>
    <Link to={'/admin'} className="nav-link">ADMIN</Link>
    <Link to={'/Login'} className="nav-link">LOGIN</Link>
    <button onClick={()=>{
      localStorage.removeItem("token")
    }}>logout</button>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
        {
            location.pathname==="/admin"?<></>: <Form className="d-flex">
                <Form.Control
                onChange={(e) => SetSearchItem(e.target.value)}
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
            </Form>
        }
        </Navbar.Collapse>
      </Container>
    </Navbar>






       
    
    </>
}


export default Header