import React from "react";
import "./service.scss";
import hotel from "../../../assets/images/hotel.jpg";
import rent from "../../../assets/images/rent.jpg"
import res from "../../../assets/images/res.jpg"


function ServiceAd() {
  return (
    <div className="container text-center services" id="services">
      <h1
        class="h1-reponsive white-text text-uppercase font-weight-bold mb-5  wow fadeInDown"
        data-wow-delay="0.3s"
      >
        <strong style={{fontFamily:"monospace", color:"#108fe3"}} className="joy-ser">Joy Services</strong>
      </h1>
      {/* <hr class="hr-light my-4 wow fadeInDown" data-wow-delay="0.4s" /> */}

      <div className="row">
        <div className="col-md-4">
          <div class="card serv">
            <div class="serv__image-container">
              <img
                class="serv__image"
                src="http://seethrumag.com/wp-content/uploads/2016/06/P2160146-1.jpg"
                alt=""
              />
            </div>

            <svg class="serv__svg" viewBox="0 0 800 500">
              <path
                d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500"
                stroke="transparent"
                fill="rgba(0,0,0,.5)"
              />
              <path
                class="serv__line"
                d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400"
                stroke="pink"
                stroke-width="3"
                fill="transparent"
              />
            </svg>

            <div class="serv__content">
              <h2 class="serv__title">Hotels</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
                dolor praesentium at quod autem omnis, amet eaque unde
                perspiciatis adipisci possimus quam facere illo et quisquam quia
                earum nesciunt porro.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div class="card serv">
            <div class="serv__image-container">
              <img
                class="serv__image"
                src={res}
                alt=""
              />
            </div>

            <svg class="serv__svg" viewBox="0 0 800 500">
              <path
                d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500"
                stroke="transparent"
                fill="rgba(0,0,0,.5)"
              />
              <path
                class="serv__line"
                d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400"
                stroke="pink"
                stroke-width="3"
                fill="transparent"
              />
            </svg>

            <div class="serv__content">
              <h2 class="serv__title">Restaurants</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
                dolor praesentium at quod autem omnis, amet eaque unde
                perspiciatis adipisci possimus quam facere illo et quisquam quia
                earum nesciunt porro.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div class="card serv">
            <div class="serv__image-container">
              <img
                class="serv__image"
                src={rent}
                alt=""
              />
            </div>

            <svg class="serv__svg" viewBox="0 0 800 500">
              <path
                d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500"
                stroke="transparent"
                fill="rgba(0,0,0,.5)"
              />
              <path
                class="serv__line"
                d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400"
                stroke="pink"
                stroke-width="3"
                fill="transparent"
              />
            </svg>

            <div class="serv__content">
              <h2 class="serv__title">Rent</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
                dolor praesentium at quod autem omnis, amet eaque unde
                perspiciatis adipisci possimus quam facere illo et quisquam quia
                earum nesciunt porro.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceAd;