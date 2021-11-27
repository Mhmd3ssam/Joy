import React from 'react';
import {Link}from "react-router-dom"
import "./plans.css"

function PlansCards() {
    return (
        <div class="container plans" id="plans">
              <h1
        class="h1-reponsive white-text text-uppercase font-weight-bold mb-5 text-center wow fadeInDown"
        data-wow-delay="0.3s"
      >
        <strong style={{fontFamily:"monospace", color:"#108fe3", fontStyle:"italic"}} className="">Pricing Plans</strong>
      </h1>
        <div class="row">
            <div class="col-md-4 col-sm-6">
                <div class="pricingTable">
                    <div class="pricingTable-header">
                        <i class="fa fa-adjust"></i>
                        <div class="price-value"> 3000 EGP <span class="month">per 3 months</span> </div>
                    </div>
                    <h3 class="heading">Basic</h3>
                    <div class="pricing-content">
                        <ul>
                            <li><b>50GB</b> Disk Space</li>
                            <li><b>50</b> Email Accounts</li>
                            <li><b>50GB</b> Monthly Bandwidth</li>
                            <li><b>10</b> subdomains</li>
                            <li><b>15</b> Domains</li>
                        </ul>
                    </div>
                    <div class="pricingTable-signup">
                        <Link to="/signup?plane=3m">sign up</Link>
                    </div>
                </div>
            </div>

            {/* <div class="col-md-3 col-sm-6">
                <div class="pricingTable green">
                    <div class="pricingTable-header">
                        <i class="fa fa-briefcase"></i>
                        <div class="price-value"> $20.00 <span class="month">per month</span> </div>
                    </div>
                    <h3 class="heading">Business</h3>
                    <div class="pricing-content">
                        <ul>
                            <li><b>60GB</b> Disk Space</li>
                            <li><b>60</b> Email Accounts</li>
                            <li><b>60GB</b> Monthly Bandwidth</li>
                            <li><b>15</b> subdomains</li>
                            <li><b>20</b> Domains</li>
                        </ul>
                    </div>
                    <div class="pricingTable-signup">
                        <a href="#">sign up</a>
                    </div>
                </div>
            </div> */}
            <div class="col-md-4 col-sm-6">
                <div class="pricingTable blue">
                    <div class="pricingTable-header">
                        <i class="fa fa-diamond"></i>
                        <div class="price-value"> 5000 EGP <span class="month">per 6 months</span> </div>
                    </div>
                    <h3 class="heading">Business</h3>
                    <div class="pricing-content">
                        <ul>
                            <li><b>70GB</b> Disk Space</li>
                            <li><b>70</b> Email Accounts</li>
                            <li><b>70GB</b> Monthly Bandwidth</li>
                            <li><b>20</b> subdomains</li>
                            <li><b>25</b> Domains</li>
                        </ul>
                    </div>
                    <div class="pricingTable-signup">
                    <Link to="/signup?plane=6m">sign up</Link>
                    </div>
                </div>
            </div>
            <div class="col-md-4 col-sm-6">
                <div class="pricingTable red">
                    <div class="pricingTable-header">
                        <i class="fa fa-cube"></i>
                        <div class="price-value"> 9000 EGP <span class="month">per year</span> </div>
                    </div>
                    <h3 class="heading">Premium</h3>
                    <div class="pricing-content">
                        <ul>
                            <li><b>80GB</b> Disk Space</li>
                            <li><b>80</b> Email Accounts</li>
                            <li><b>80GB</b> Monthly Bandwidth</li>
                            <li><b>25</b> subdomains</li>
                            <li><b>30</b> Domains</li>
                        </ul>
                    </div>
                    <div class="pricingTable-signup">
                    <Link to="/signup?plane=1y">sign up</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>

    )
}

export default PlansCards







// Months
// 