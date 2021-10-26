import React from "react";
import { Navbar, Container} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom"
export default function Home() {
  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand href="#home">Joy </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
             <Link to="/login" className="mx-5"> Login </Link>
             <Link to="/signup"> Sign Up </Link>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
