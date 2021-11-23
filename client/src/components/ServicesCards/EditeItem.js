import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../Firebase";
import {  MDBInput } from 'mdbreact';
import {BrowserRouter as Router,Link,useLocation , useHistory} from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import EditeImage from "../../pages/CreateService/images/edite.jpeg"
export default function EditeItem() {
  //our state
    const [error, setError] = useState("");
    const [load, setLoad] = useState(true);
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const history = useHistory();

    const { search } = useLocation();
    const {  editAllServicesFields, getSingleService } = useAuth();

    const[imgPath,setImgPath] = useState("");
    const[descripition,setDescripition] = useState("");
    const[Name,setName] = useState("");
    const[phone,setPhone] = useState("");
    const[price,setPrice] = useState("");
    const[theOfferRatio,setTheOfferRatio] = useState("");
    const[offer,setOffer] = useState("");
    const[created,setCreated] = useState("");
    const[brand,setbrand] = useState("");

    let catgory = search.split('=')[2];
    let itemId = search.split('&')[0].split('=')[1];


    //our functions 
    function editeService() {
      console.log("ggg");
      editAllServicesFields(catgory, itemId, {
        serviceName: Name,
        serviceDescripition: descripition,
        servicePhone: phone,
        servicePrice:price,
        offerd: offer,
        offerRatio: theOfferRatio,
        createdAt: new Date(),
        createdBy: created,
        imagePath: imgPath,
        brandName:brand
      });
      history.push(`/${catgory.toLowerCase()}`)

    }

    function getData(){
      getSingleService(catgory, itemId)
      .then((data)=>{
        const{imagePath,serviceDescripition,serviceName,servicePhone,servicePrice , createdBy , offerRatio , offerd ,brandName}= data;
        setImgPath(imagePath)
        setDescripition(serviceDescripition)
        setName(serviceName)
        setPhone(servicePhone)
        setPrice(servicePrice)
        setTheOfferRatio(offerRatio)
        setOffer(offerd)
        setCreated(createdBy)
        setbrand(brandName)
      })
    }

    function handelChange(e) {
      setProgress(0)
      if (e.target.files[0]) {
        Object.defineProperty(e.target.files[0], 'name', {
          writable: true,
          value: new Date()
        })
        setImage(e.target.files[0])
      }
    }
    
  async function handelUpload() {
    const storage = getStorage(app);
    const storageReff = storageRef(storage);
    const imagesRef = storageRef(storageReff, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(imagesRef, image)
    console.log(uploadTask)
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImgPath(downloadURL)
        });
      }
    )
  }
    useEffect(()=>{
      getData()
      setLoad(false)
    },[])
    console.log(catgory)
    console.log(itemId)
    console.log(Name)
    let progressComp = () => {
      return (
        <div class="progress">
          <div
            class="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      );
    };

    return ( 
  <>
    <Container className="mt-5">
      <section className="h-100 h-custom">
        <div className="container  h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-8 ">
              <div className="card rounded-3">
                <img
                src={EditeImage}
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
                     Edite Service
                  </h3>
                  <form className="px-md-2" onSubmit={editeService}>
                    <div className=" mb-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Brand Name"
                        onChange={(e) => {
                         setbrand(e.target.value)
                        }}
                        value={brand}
                        name="brandName"
                     
                      />
                      {/* {errors.brandName ? (
                        <small className="text-danger ms-1">
                          {errors.brandName}
                        </small>
                      ) : null} */}
                    </div>

                    <div className="mb-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Service Name"
                        // ref={serviceNameRef}
                        onChange={(e) => {
                          // handleInputChange(e);
                        }}
                        // value={serviceName}
                        name="serviceName"
                        value={Name}
                        onChange={(e)=>{setName(e.target.value)}}
                      />
                      {/* {errors.serviceName ? (
                        <small className="text-danger ms-1">
                          {errors.serviceName}
                        </small>
                      ) : null}{" "} */}
                    </div>
                    

                    <div className=" mb-4">
                      <textarea
                        className="form-control"
                        placeholder="Service Details"
                        rows="5"
                        // ref={serviceDescripitionRef}
                        onChange={(e) => {
                          // handleInputChange(e);
                        }}
                        // value={serviceDescripition}
                        name="serviceDescripition"
                        value={descripition}
                        onChange={(e)=>{setDescripition(e.target.value)}}
                      />
                      {/* {errors.serviceDescripition ? (
                        <small className="text-danger ms-1">
                          {errors.serviceDescripition}
                        </small>
                      ) : null} */}
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className=" datepicker">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Price"
                            // ref={servicePriceRef}
                            // value={servicePrice}
                            name="servicePrice"
                            onChange={(e) => {
                              // handleInputChange(e);
                            }}
                            value={price} 
                            onChange={(e)=>{setPrice(e.target.value)}}
                          />
                        </div>
                        {/* {errors.servicePrice ? (
                          <small className="text-danger ms-1">
                            {errors.servicePrice}
                          </small>
                        ) : null} */}
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className=" datepicker">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Phone Number"
                            // ref={servicePhoneRef}
                            onChange={(e) => {
                              // handleInputChange(e);
                            }}
                            // value={servicePhone}
                            name="servicePhone"
                            value={phone}
                            onChange={(e)=>{setPhone(e.target.value)}}
                          />
                          {/* {errors.servicePhone ? (
                            <small className="text-danger ms-1">
                              {errors.servicePhone}
                            </small>
                          ) : null} */}
                        </div>
                      </div>
                    </div>
                    <div class="input-group mb-3">
                      <input
                        type="file"
                        class="form-control"
                        name="image"
                        placeholder="Upload Image"
                        onChange={handelChange}
                      />
                      <button
                        className="btn btn-primary "
                        onClick={handelUpload}
                        disabled={progress === 100 ? true : false}
                        type="button"
                      >
                        {progress === 100 ? "Uploaded" : "Upload"}
                      </button>
                    </div>
                    {/* <span className="text-danger">{error}</span> */}
                    {progress === 0 ? null : progress > 0 && progress < 100 ? (
                      progressComp()
                    ) : progress === 100 ? (
                      <>
                        Image Uploaded{" "}
                        <img
                          src="https://img.icons8.com/nolan/96/photoshoot-completed.png"
                          width="20"
                        />
                      </>
                    ) : null}
                    <button
                      type="submit"
                      className="btn btn-primary w-100 btn-lg mb-1 mt-4"
                    >
                      create
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
