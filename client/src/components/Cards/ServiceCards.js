import React from 'react';
import ServiceCard from './CardUi';
import './card-style.css';


const ServiceCards = () => {
    return (
        <div className="container-fluid d-flex justify-content-center">
            <div className="row">
                <div className="col-md-4"><ServiceCard /></div>
                <div className="col-md-4"><ServiceCard /></div>
                <div className="col-md-4"><ServiceCard /></div>

            </div>
            
        </div>
    )
}

export default ServiceCards
