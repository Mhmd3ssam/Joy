import React from 'react';
import ServiceCard from './CardUi';
import './card-style.css';
import {Navbar,Container, Nav} from 'react-bootstrap'
import { Link , BrowserRouter as Router , Route , Switch} from 'react-router-dom';
import Hotels from './Hotels';
import Restaurants from './Restaurants';

const ServiceCards = () => {
    return (
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
    )
}

export default ServiceCards
