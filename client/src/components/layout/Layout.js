import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Routes from '../Routes';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './layout.css'


const Layout = () => {
    return (
        <Router>
            <Route render={(props) => (

                <div className="layout">
                    <Sidebar {...props} />
                    <div className="layout__content">
                    <div className="layout__content__main">
                        <Routes/>
                        </div>
                    </div>
                </div>
                
            )}/>

        </Router>
    )
}


export default Layout
