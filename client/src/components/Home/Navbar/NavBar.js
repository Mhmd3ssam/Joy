import React from 'react'
import { Link } from 'react-router-dom'
import logo from "./joylogo.jpg";
import "./nav.css"
export default function NavBar() {
    return (
        <section id="header">
            <div className="container">
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid d-flex justify-content-between">
                        <div >
                            <Link class="navbar-brand" to="/">
                                <img src={logo} className="rounded col-md-4" />
                            </Link>
                            <span>Agency</span>
                        </div>
                        <div>
                        <Link to="/login" className="mx-5"> Login </Link>
                        <Link to="/signup"> Sign Up </Link>
                       <Link to="/contact"  className="mx-5"> Contact Us </Link>

                        </div>
                    </div>
                </nav>
            </div>
        </section>
    )
}
