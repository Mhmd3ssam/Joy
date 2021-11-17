import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import TopNav from '../TopNav/TopNav';
import Routes from '../Routes';
import { Navbar, Container, Nav } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './layout.css'

const Layout = () => {
    return (
        <Router>
            <Route render={(props) => (
                <div className="layout">
                    <Sidebar {...props} />
                    <div className="layout__content">
                        <TopNav />
                        <Navbar bg="dark" variant="dark">
                            <Container>
                                <Link to="/layout">Navbar</Link>
                                <Nav className="me-auto">
                                    <Link to="/services" className="mx-5"> Rent</Link>
                                    <Link to="/hotels" className="mx-5">Hotels</Link>
                                    <Link to="/restaurants" className="mx-5">Restaurants</Link>
                                </Nav>
                            </Container>
                        </Navbar>
                        <div className="layout__content__main">
                            <Routes />
                        </div>
                    </div>
                </div>
            )} />
        </Router>
    )
}


export default Layout
