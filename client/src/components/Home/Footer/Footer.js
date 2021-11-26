import React from 'react';
import "./footer.css";
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div class="container-fluid">
        {/* <!-- Footer --> */}
        <footer
                class="text-center text-lg-start text-dark"
                style={{backgroundColor: "#fff"}}
                >
          {/* <!-- Section: Social media --> */}
          <section
                   class="d-flex justify-content-between py-1 text-white"
                   style={{backgroundColor: "#108fe3"}}
                   >
            {/* <!-- Left --> */}
            <div class="ms-5">
              <span className="fs-5">Get connected with us on social networks:</span>
            </div>
            {/* <!-- Left --> */}
      
            {/* <!-- Right --> */}
            <div className="me-5 pe-5">

            <a
                        href="#"
                        class="ml-0 text-decoration-none text-white me-5"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          class="bi bi-facebook"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                        </svg>
                      </a>
                      <a
                        href="#"
                        class="text-decoration-none text-white me-5"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          class="bi bi-twitter"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                        </svg>
                      </a>
                      <a
                        href="#"
                        class="text-decoration-none text-white me-5"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-youtube"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
                        </svg>
                      </a>
              {/* <a href="" class="text-white me-4">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="" class="text-white me-4">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="" class="text-white me-4">
                <i class="fab fa-google"></i>
              </a>
              <a href="" class="text-white me-4">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="" class="text-white me-4">
                <i class="fab fa-linkedin"></i>
              </a>
              <a href="" class="text-white me-4">
                <i class="fab fa-github"></i>
              </a> */}
            </div>
            {/* <!-- Right --> */}
          </section>
          {/* <!-- Section: Social media --> */}
      
          {/* <!-- Section: Links  --> */}
          <section class="">
            <div class="container text-center text-md-start mt-5">
              {/* <!-- Grid row --> */}
              <div class="row mt-3">
                {/* <!-- Grid column --> */}
                <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  {/* <!-- Content --> */}
                  <h6 class="text-uppercase fw-bold">Joy</h6>
                  <hr
                      class="mb-4 mt-0 d-inline-block mx-auto"
                      style={{width: "30px", backgroundColor: "#ffa442", height: "4px"}}
                      />
                  <p>
                    Here you can use rows and columns to organize your footer
                    content. Lorem ipsum dolor sit amet, consectetur adipisicing
                    elit.
                  </p>
                </div>
                {/* <!-- Grid column --> */}
      
                {/* <!-- Grid column --> */}
                <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                  {/* <!-- Links --> */}
                  <h6 class="text-uppercase fw-bold">Services</h6>
                  <hr
                      class="mb-4 mt-0 d-inline-block mx-auto"
                      style={{width: "70px", backgroundColor: "#ffa442", height: "4px"}}
                      />
                  <p>
                    <a href="#!" class="text-dark">Hotels Booking</a>
                  </p>
                  <p>
                    <a href="#!" class="text-dark">Units Rent</a>
                  </p>
                  <p>
                    <a href="#!" class="text-dark">Restaurants Services</a>
                  </p>
                </div>
                {/* <!-- Grid column --> */}
      
                {/* <!-- Grid column --> */}
                <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                  {/* <!-- Links --> */}
                  <h6 class="text-uppercase fw-bold">Plans</h6>
                  <hr
                      class="mb-4 mt-0 d-inline-block mx-auto"
                      style={{width: "47px", backgroundColor: "#ffa442", height: "4px"}}
                      />
                  <p>
                    <a href="#!" class="text-dark">Basic</a>
                  </p>
                  <p>
                    <a href="#!" class="text-dark">Business</a>
                  </p>
                  <p>
                    <a href="#!" class="text-dark">Premium</a>
                  </p>
                </div>
                {/* <!-- Grid column --> */}
      
                {/* <!-- Grid column --> */}
                <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                  {/* <!-- Links --> */}
                  <h6 class="text-uppercase fw-bold text-primary">
                  <Link to="/contact">
                      Contact Us
                      </Link>
                      </h6>
                  <hr
                      class="mb-4 mt-0 d-inline-block mx-auto"
                      style={{width: "80px", backgroundColor: "#ffa442", height: "4px"}}
                      />
                  <p><i class="fas fa-home mr-3"></i>Egypt, Aswan</p>
                  <p><i class="fas fa-envelope mr-3"></i>joy.team2022@gmail.com</p>
                  <p><i class="fas fa-phone mr-3"></i> + 02 010 1214 3511</p>
                  <p><i class="fas fa-print mr-3"></i> + 02 010 2971 8897</p>
                </div>
                {/* <!-- Grid column --> */}
              </div>
              {/* <!-- Grid row --> */}
            </div>
          </section>
          {/* <!-- Section: Links  --> */}
      
          {/* <!-- Copyright --> */}
          <div
               class="text-center p-3"
               style={{backgroundColor: "#e5e5e5"}}
               >
            © 2021 Copyright:
            <a class="fs-6 text-primary" href="#"
               >&nbsp; joy.com</a
              >
          </div>
          {/* <!-- Copyright --> */}
        </footer>
        {/* <!-- Footer --> */}
      </div>
    )
}

export default Footer;
