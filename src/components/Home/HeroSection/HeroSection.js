import React, {useEffect} from "react";
import { Link } from 'react-router-dom'
import NavBar from "../Navbar/NavBar"
import "./hero.css";
//import WOW from 'wowjs';


export default function HeroSection() {

    // useEffect(() => {
    //     new WOW.WOW({
    //         live: false
    //     }).init();
    // }, [])
  return (
    <div  class="view">
    {/* <!-- Main navigation --> */}
   <header>
     {/* <nav class="navbar navbar-expand-lg navbar-dark fixed-top scrolling-navbar">
       <div class="container">
         <Link class="navbar-brand" to="/">
           <strong className="text-primary">JOY</strong>
         </Link>
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
         </div>
       </div>
     </nav> */}
     <NavBar/>
     {/* <!-- Full Page Intro --> */}
     <div style={{backgroundImage: "url('https://pix6.agoda.net/geo/city/14246/1_14246_02.jpg?s=1920x822')", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center center", minHeight: "100vh"}}>
       {/* <!-- Mask & flexbox options--> */}
       <div class="mask rgba-gradient d-flex justify-content-center align-items-center">
         {/* <!-- Content --> */}
         <div class="container">
           {/* <!--Grid row--> */}
           <div class="row">
             {/* <!--Grid column--> */}
             <div class="col-md-6 text-center text-md-left mt-5 mb-5 wow fadeInLeft" data-wow-delay="0.3s" style={{transform: "translate(-50px, 300px)",
                backgroundImage: "linear-gradient(to right, rgba(255, 255, 255, .1), rgba(168, 167, 167, 0.1))",
              }} >
               <h1 class="h1-responsive text-light font-weight-bold mt-sm-5">It's time to grow your Business </h1>
               <hr class="hr-light"/>
               <h6 class="mb-4 text-light">With joy, you'll grow your business faster & wider through affordable business Plans help you
               market your services to fit the market needs, as we know the other side exact needs.</h6>
               <a class="btn btn-white">Download</a>
               <a class="btn btn-outline-white">Learn more</a>
             </div>
             {/* <!--Grid column-->
             <!--Grid column--> */}
             <div  class="col-md-6 col-xl-5 mt-xl-5 wow fadeInRight" data-wow-delay="0.3s">
               {/* <img src="https://mdbootstrap.com/img/Mockups/Transparent/Small/admin-new.png" alt="" class="img-fluid"/> */}
             </div>
             {/* <!--Grid column--> */}
           </div>
           {/* <!--Grid row--> */}
         </div>
         {/* <!-- Content --> */}
       </div>
       {/* <!-- Mask & flexbox options--> */}
     </div>
     <div className="col-6"></div>
   
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
   </div>
  );
}

