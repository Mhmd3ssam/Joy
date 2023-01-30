import React from 'react'
import { Link } from 'react-router-dom'
import logo from "./joylogo.jpg";
import "./nav.css"
export default function NavBar() {
    return (
        <section id="header">
            <div className="container-fluid top-nav">
                <nav class="navbar navbar-expand-lg navbar-light bg-light top-nav fs-5 fw-bold lex justify-content-between align-items-center">
                    <div class="container-fluid d-flex justify-content-between">
                        <div  >
                            <Link class="navbar-brand" to="/">
                                {/* <img src={logo} className="rounded col-md-4" /> */}
                                <h1 className="mb-0 mt-1 ms-5" style={{color: "#108fe3", transform: "translate(10px,10px)", fontStyle:"italic"}}>JOY</h1>
                            </Link>
                        </div>
                        <div>
                        <Link to="/login" className="mx-5"> Login </Link>
                        <a href="#services" className="mx-5"> Services </a>
                        <a href="#plans" className="mx-5"> Plans </a>
                       <Link to="/contact"  className="mx-5"> Contact Us </Link>

                        </div>
                    </div>
                </nav>
            </div>
        </section>
    )
}
