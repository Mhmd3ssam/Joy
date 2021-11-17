import React from 'react';
import ServiceCard from './CardUi';
import './card-style.css';
import {Navbar,Container, Nav} from 'react-bootstrap'
import { Link , BrowserRouter as Router , Route , Switch} from 'react-router-dom';
import Hotels from './Hotels';
import Restaurants from './Restaurants';
import { useAuth } from '../../context/AuthContext';

const ServiceCards = () => {
    const { deletService } = useAuth();
    const handelDelete = ()=>{
        deletService('Rent', 'cHvvACaqWGuxMtQgMiYm');
    }

    return (
        <>
            <ServiceCard  handelClick={handelDelete}/>
        </>    
    )
}

export default ServiceCards
