import React from 'react';
import './card-style.css'




const ServiceCard = props => {
    return (
        <div className="card text-center me-3 ">
            <div className="overflow">
                <img src="https://www.ahstatic.com/photos/1666_ho_00_p_1024x768.jpg" alt="Cataract" className="card-img-top" />
            </div>

            <div className="card-body text-dark">
                <h4 className="card-title">Service Name</h4>
                <p className="card-text text-secondary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br/>
                 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure <br/>
                 dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,<br/>
                  sunt in culpa qui officia deserunt mollit anim id est laborum
                </p>
                <a href="#"><button className="btn btn-outline-info">Know more</button></a> 
            </div>
        </div>
    )
}

export default ServiceCard;
