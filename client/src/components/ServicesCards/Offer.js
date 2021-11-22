import React, { useState, useEffect } from "react";
import {  Container } from "react-bootstrap";
import { BrowserRouter as Router, Link, useLocation, useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import OfferImage from "../../pages/CreateService/images/offer.jpeg"
export default function EditeItem() {
  //our state
  const [error, setError] = useState("");
  const [load, setLoad] = useState(true);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const history = useHistory();

  const { search } = useLocation();
  const { editAllServicesFields, getSingleService } = useAuth();

  const [imgPath, setImgPath] = useState("");
  const [descripition, setDescripition] = useState("");
  const [Name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [price, setPrice] = useState("");
  const [theOfferRatio, setTheOfferRatio] = useState("");
  const [created, setCreated] = useState("");
  const [brand, setbrand] = useState("");

  let catgory = search.split('=')[2];
  let itemId = search.split('&')[0].split('=')[1];


  //our functions 
  function Offer(e) {
    setError("");
    e.preventDefault();
    try {
      if(Number(theOfferRatio) === 0 ){
        throw "Offer must be more than 0"
      }else if(theOfferRatio > 100 ){
        throw "Offer must be less than 100"
      }
      else{
        editAllServicesFields(catgory, itemId, {
          serviceName: Name,
          serviceDescripition: descripition,
          servicePhone: phone,
          servicePrice: price,
          offerd: true,
          offerRatio: theOfferRatio,
          createdAt: new Date(),
          createdBy: created,
          imagePath: imgPath,
          brandName: brand
        });
        console.log("hhh")
        history.push(`/${catgory.toLowerCase()}`)
      }
      
    } catch (error) {
      setError(error)
    }

  }

  function getData() {
    getSingleService(catgory, itemId)
      .then((data) => {
        const { imagePath, serviceDescripition, serviceName, servicePhone, servicePrice, createdBy, offerRatio, offerd, brandName } = data;
        setImgPath(imagePath)
        setDescripition(serviceDescripition)
        setName(serviceName)
        setPhone(servicePhone)
        setPrice(servicePrice)
        setTheOfferRatio(offerRatio)
        setCreated(createdBy)
        setbrand(brandName)
      })
  }


  useEffect(() => {
    getData()
    setLoad(false)
    document.title = "Offer"

  }, [])
  console.log(catgory)
  console.log(itemId)
  console.log(theOfferRatio)


  return (
    <>
      <Container className="mt-5">
        <section className="h-100 h-custom">
          <div className="container  h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-8 ">
                <div className="card rounded-3">
                  <img
                    src={OfferImage}
                    className="w-100"
                    style={{
                      borderTopLeftRadius: ".3rem",
                      borderTopRightRadius: ".3rem",
                      width: "709px",
                      height: "261px",
                      objectFit: "cover"
                    }}
                    alt="Sample photo"
                  />
                  <div className="card-body  ">
                    <h3 className="mb-4 pb-2 pb-md-0  px-md-2 text-center text-primary">
                      Make Offer
                    </h3>
                    <form className="px-md-2" onSubmit={Offer}>
                      <div className="row">
                        <div className="col-md-12 mb-4">
                          <div className=" datepicker">
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Offer Ratio"
                              value={theOfferRatio}
                              onChange={(e) => { setTheOfferRatio(e.target.value) }}
                              name="Offer_Ratio"
                            />
                            <small className="text-danger ms-1">
                              {error}
                            </small>
                          </div>
                        </div>
                      </div>
                      <button
                        className="btn btn-primary w-100 btn-lg mb-1 mt-4"
                      >
                        Confirm Offer
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>

    </>

  )
}
