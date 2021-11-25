import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../Home/joylogo.jpg"
export default function NavBar() {
    return (
        <section>
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
                        </div>
                    </div>
                </nav>
            </div>
        </section>
    )
}
