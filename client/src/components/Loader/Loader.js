import React from 'react'
import "./Loader.css"
export default function Loader() {
    return (
        <div className="container move">
            <div className="row  ">
                <div className="col-sm-12 text-center ">
                    <div className="loader1">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
            <div className="row"></div>
        </div>
    )
}
