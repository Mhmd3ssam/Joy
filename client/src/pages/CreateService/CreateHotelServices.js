import React, { useState, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useHistory , useLocation} from "react-router-dom";
import { getFirestore, collection } from "firebase/firestore";
import app from "../../Firebase";
import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import "../../components/ContactUs/ContactUs.css";
import Hotel from "./images/hotels.jpeg"
import Restaurants from "./images/rest.jpeg"
import Buildings from "./images/building.jpeg"
import "./CreateService.css";

function CreateHotelServices() {
  //Inputs Refs
  const serviceNameRef = useRef();
  const brandNameRef = useRef();
  const serviceDescripitionRef = useRef();
  const servicePriceRef = useRef();
  const servicePhoneRef = useRef();
  const serviceImage = useRef();
  const romNumberRef = useRef();
  const formRef = useRef()
  console.log(formRef)
  //Input States
  const [serviceName, setServiceName] = useState("");
  const [brandName, setServiceBrandName] = useState("");
  const [serviceDescripition, setServiceDescripition] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [servicePhone, setServicePhone] = useState("");


  const { search } = useLocation();
  let searchName = search.split('=')[1];

  console.log(searchName)

  const [errors, setErrors] = useState({
    serviceName: "",
    brandName: "",
    serviceDescripition: "",
    servicePrice: "",
    servicePhone: "",
    
  });

  console.log(serviceName);

  let mobileCode = servicePhone.substring(0, 3);
  console.log(mobileCode);
  let validMobileCode =
    mobileCode == "010" ||
    mobileCode == "011" ||
    mobileCode == "012" ||
    mobileCode == "015"
      ? true
      : false;
  console.log(validMobileCode);

  const [image, setImage] = useState([]);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState([]);
  const { setService, setHotelService} = useAuth();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const db = getFirestore(app);
  const serviceCollectionRef = collection(db, "Hotels");

  
  function handelChange(e) {
    setProgress(0);
    for(let i=0; i < e.target.files.length; i++)
    {

      if (e.target.files[i]) {
        Object.defineProperty(e.target.files[i], "name", {
          writable: true,
          value: `${new Date()} + ${i}`,
        });
        const newImage = e.target.files[i]
        newImage["id"] = `${new Date()} + ${i}`
        setImage((prevState)=> [...prevState, newImage]);
        console.log(image);
      }
    }
   
  }
  console.log(image);


  
  async function handelUpload(e) {
    e.preventDefault();
    const promises = [];
    image.map((img) => {

      try {
        setError("");
        const storage = getStorage(app);
        const storageReff = storageRef(storage);
        const imagesRef = storageRef(storageReff, `Hotel/${img.name}`);
        const uploadTask = uploadBytesResumable(imagesRef, img);
        promises.push(uploadTask)
        console.log(uploadTask);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const prog = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(prog);
            console.log(prog);
          },
          (error) => console.log(error),
          async () => {
          await  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
              setUrl((prevState) => [...prevState, downloadURL]);
            });
          }
        );
      } catch (error) {
        console.log(error.message);
        setError("Upload Image First");
      }
    })
   Promise.all(promises)
   .then(()=> alert("Done"))
   .catch((e) => alert(e))
  }

  console.log(url);
  function errorSubmitState(e){
    console.log(e)
    setErrors({
      ...errors,
      brandName:
        e.target[0].value === ""? "Hotel name is required" : null,
      serviceName:
        e.target[1].value=== "" ? "Room Title is required" : null,
      // catagory:
      //   e.target[2].value === "" ? "Please Specifiy a category" : null,
      serviceDescripition:
        e.target[3].value === ""
          ? "Room features is required"
          : null,
      servicePrice:
          e.target[4].value.length === 0
            ? "Room price is required"
            : e.target[4].value == 0
            ? "Price must be more than 0"
            : null,
      servicePhone:
            e.target[5].value.length === 0
              ? "Reservation Number is required"
              : e.target[5].value.length !== 11
              ? "phone Number must be 11 Number"
              : !validMobileCode
              ? "Phone Number must start with a valid code"
              : null,
            
    });
  }

  async function handelSubmit(e) {
    console.log(url);
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      if(serviceNameRef.current.value === ""
      ||serviceDescripitionRef.current.value ===""
      || servicePriceRef.current.value ===""
      || servicePriceRef.current.value === "0"
      || servicePhoneRef.current.value === ""
      || servicePhoneRef.current.value.length !== 11
      ||brandNameRef.current.value === ""
      ||validMobileCode === false
      ||url === ""
      // ||catagory === "default"
      ){
        throw "error"
      }
      //serviceCollectionRef
      await setHotelService(serviceCollectionRef, {
        serviceName: serviceNameRef.current.value,
        serviceDescripition: serviceDescripitionRef.current.value,
        servicePrice: servicePriceRef.current.value,
        servicePhone: servicePhoneRef.current.value,
        brandName: brandNameRef.current.value,
        imagePath: url,
        roomNumbers:parseInt(romNumberRef.current.value)
      });
      console.log("done");
      history.push('/hotels');
    } catch (error) {
      setError(error.message);
      console.log(error)
      errorSubmitState(e)
    }
    setLoading(false);
  }
  
  const handleInputChange = (e) => {
    if (e.target.name === "serviceName") {
      setServiceName(e.target.value);
      setErrors({
        ...errors,
        serviceName:
          e.target.value.length === 0 ? "Room Title is required" : null,
          
      });
      if(e.target.value.length === 0 ){
         throw "Service name is required"
      }
    }

    if (e.target.name === "brandName") {
      setServiceBrandName(e.target.value);
      setErrors({
        ...errors,
        brandName:
          e.target.value.length === 0 ? "Hotel name is required" : null,
      });
    }

    
    if (e.target.name === "serviceDescripition") {
      setServiceDescripition(e.target.value);
      setErrors({
        ...errors,
        serviceDescripition:
          e.target.value.length === 0
            ? "Room features is required"
            : null,
      });
    }

    if (e.target.name === "servicePrice") {
      setServicePrice(e.target.value);
      setErrors({
        ...errors,
        servicePrice:
          e.target.value.length === 0
            ? "Room price is required"
            : parseInt(e.target.value) === 0
            ? "Price must be more than 0"
            : null,
      });
      console.log(typeof(e.target.value))
    }

    if (e.target.name === "servicePhone") {
      setServicePhone(e.target.value);
      setErrors({
        ...errors,
        servicePhone:
          e.target.value.length === 0
            ? "Reservation Number is required"
            : e.target.value.length !== 11
            ? "phone Number must be 11 Number"
            : !validMobileCode
            ? "Phone Number must start with a valid code"
            : null,
      });
    }
};

  useEffect(() => {
    document.title = "Create Services";
  });
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
    <Container className="mt-1">
      <section className="h-100 h-custom">
        <div className="container  h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-8 ">
              <div className="card rounded-3">
                {searchName === "hotels"? 
                 <img
                  src={Hotel}
                  className="w-100"
                  style={{
                    borderTopLeftRadius: ".3rem",
                    borderTopRightRadius: ".3rem",
                    width: "709px",
                    height: "261px",
                    objectFit: "cover"   
                  }}
                  alt="Sample photo"
                />:searchName === "restaurants"?
                <img
                  src={Restaurants}
                  className="w-100"
                  style={{
                    borderTopLeftRadius: ".3rem",
                    borderTopRightRadius: ".3rem",
                    width: "709px",
                    height: "261px",
                    objectFit: "cover"   
                  }}
                  alt="Sample photo"
                />:searchName === "rent"?
                <img
                  src={Buildings}
                  className="w-100"
                  style={{
                    borderTopLeftRadius: ".3rem",
                    borderTopRightRadius: ".3rem",
                    width: "709px",
                    height: "261px",
                    objectFit: "cover"   
                  }}
                  alt="Sample photo"
                />:
                <img
                src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-registration/img3.jpg"
                className="w-100"
                style={{
                  borderTopLeftRadius: ".3rem",
                  borderTopRightRadius: ".3rem",
                }}
                alt="Sample photo"
              />}
               
                <div className="card-body  ">
                  <h3 className="mb-4 pb-2 pb-md-0  px-md-2 text-center text-primary">
                    {searchName === "hotels" ?"Room Details"
                    : searchName === "rent" ?"Rent"
                    :searchName === "restaurants"?"Restaurants"
                    :"Create Your Service"
                    }
                  </h3>
                  <form className="px-md-2" ref={formRef} onSubmit={handelSubmit}>
                    <div className=" mb-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Hotel Name"
                        ref={brandNameRef}
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                        value={brandName}
                        name="brandName"
                      />
                      {errors.brandName ? (
                        <small className="text-danger ms-1">
                          {errors.brandName}
                        </small>
                      ) : null}
                    </div>

                    <div className="mb-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Room Title"
                        ref={serviceNameRef}
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                        value={serviceName}
                        name="serviceName"
                      />
                      {errors.serviceName ? (
                        <small className="text-danger ms-1">
                          {errors.serviceName}
                        </small>
                      ) : null}{" "}
                    </div>
                    <div className=" mb-4">
                      <textarea
                        className="form-control"
                        placeholder="Room Features"
                        rows="5"
                        ref={serviceDescripitionRef}
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                        value={serviceDescripition}
                        name="serviceDescripition"
                      />
                      {errors.serviceDescripition ? (
                        <small className="text-danger ms-1">
                          {errors.serviceDescripition}
                        </small>
                      ) : null}
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className=" datepicker">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Room Price per night"
                            ref={servicePriceRef}
                            value={servicePrice}
                            name="servicePrice"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          />
                        </div>
                        {errors.servicePrice ? (
                          <small className="text-danger ms-1">
                            {errors.servicePrice}
                          </small>
                        ) : null}
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className=" datepicker">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Reservation Number"
                            ref={servicePhoneRef}
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                            value={servicePhone}
                            name="servicePhone"
                          />
                          {errors.servicePhone ? (
                            <small className="text-danger ms-1">
                              {errors.servicePhone}
                            </small>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className=" datepicker mb-4">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Available Number"
                            ref={romNumberRef}
                            // value={servicePrice}
                            // name="servicePrice"
                            // onChange={(e) => {
                            //   handleInputChange(e);
                            // }}
                        />
                      </div>
                    <div class="input-group mb-3">
                      <input
                        type="file"
                        class="form-control"
                        name="image"
                        placeholder="Upload Image"
                        onChange={handelChange}
                        multiple
                      />
                      <button
                        className="btn btn-primary "
                        onClick={handelUpload}
                        disabled={progress === 100 ? true : false}
                      >
                        {progress === 100 ? "Uploaded" : "Upload"}
                      </button>
                    </div>
                    <span className="text-danger">{error}</span>
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
                      Create
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}

export default CreateHotelServices;
