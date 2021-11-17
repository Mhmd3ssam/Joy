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
