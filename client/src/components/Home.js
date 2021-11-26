import React from "react";
import { Navbar, Container} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom"
import NavBar from "../components/Home/Navbar/NavBar";
import HeroSection from "../components/Home/HeroSection/HeroSection"
import PlansCards from "./Home/PlansCards/PlansCards";
import Footer from "./Home/Footer/Footer";
import ServiceAd from "./Home/ServiceAds/ServiceAd";
export default function Home() {
  return (
    <>
      {/* <Navbar>
        <Container>
          <Navbar.Brand href="#home">Joy </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
             <Link to="/login" className="mx-5"> Login </Link>
             <Link to="/signup"> Sign Up </Link>
             <Link to="/contact"  className="mx-5"> Contact Us </Link>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}





      <NavBar />
      <HeroSection/>
      <ServiceAd/>
      <PlansCards />
      <Footer/>

    </>
  );
}
