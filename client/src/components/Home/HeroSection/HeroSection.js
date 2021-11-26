import React, {useEffect} from "react";
import "./hero.css";
//import WOW from 'wowjs';


export default function HeroSection() {

    // useEffect(() => {
    //     new WOW.WOW({
    //         live: false
    //     }).init();
    // }, [])
  return (
      <>
     {/* <!-- Main navigation --> */}
    <header>
      {/* <!--Navbar--> */}
      <nav class="navbar navbar-expand-lg navbar-dark fixed-top scrolling-navbar">
        <div class="container">
          <a class="navbar-brand" href="#">
            <strong>JOY</strong>
          </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-7" aria-controls="navbarSupportedContent-7" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent-7">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a class="nav-link" href="#">Home
                  <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Profile</a>
              </li>
            </ul>
            <form class="form-inline">
              <div class="md-form my-0">
                <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
              </div>
            </form>
          </div>
        </div>
      </nav>
      {/* <!-- Full Page Intro --> */}
      <div class="view" style={{backgroundImage: "url('https://mdbootstrap.com/img/Photos/Others/architecture.jpg')", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center center"}}>
        {/* <!-- Mask & flexbox options--> */}
        <div class="mask rgba-gradient d-flex justify-content-center align-items-center">
          {/* <!-- Content --> */}
          <div class="container">
            {/* <!--Grid row--> */}
            <div class="row">
              {/* <!--Grid column--> */}
              <div class="col-md-6 white-text text-center text-md-left mt-xl-5 mb-5 wow fadeInLeft" data-wow-delay="0.3s">
                <h1 class="h1-responsive font-weight-bold mt-sm-5">Make purchases with our app </h1>
                <hr class="hr-light"/>
                <h6 class="mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem repellendus quasi fuga nesciunt
                dolorum nulla magnam veniam sapiente, fugiat! Commodi sequi non animi ea dolor molestiae
                iste.</h6>
                <a class="btn btn-white">Download</a>
                <a class="btn btn-outline-white">Learn more</a>
              </div>
              {/* <!--Grid column-->
              <!--Grid column--> */}
              <div class="col-md-6 col-xl-5 mt-xl-5 wow fadeInRight" data-wow-delay="0.3s">
                <img src="" alt="" class="img-fluid"/>
              </div>
              {/* <!--Grid column--> */}
            </div>
            {/* <!--Grid row--> */}
          </div>
          {/* <!-- Content --> */}
        </div>
        {/* <!-- Mask & flexbox options--> */}
      </div>
      {/* <!-- Full Page Intro --> */}
    </header>
    {/* <!-- Main navigation -->
    <!--Main Layout--> */}
    <main>
      <div class="container">
        {/* <!--Grid row--> */}
        <div class="row py-5">
          {/* <!--Grid column--> */}
          <div class="col-md-12 text-center">
          </div>
          {/* <!--Grid column--> */}
        </div>
        {/* <!--Grid row--> */}
      </div>
    </main>
    {/* <!--Main Layout--> */}
    </>
  );
}
