import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../Firebase";
import {BrowserRouter as Router,Link,useLocation , useHistory} from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import EditeImage from "../../pages/CreateService/images/edite.jpeg"


export default function EditeRent() {
  //our state
    const [error, setError] = useState("");
    const [load, setLoad] = useState(true);
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const history = useHistory();

    const { search } = useLocation();
    const {  editAllServicesFields, getSingleService , editHotelService} = useAuth();

    const[imgPath,setImgPath] = useState("");
    const[descripition,setDescripition] = useState("");
    const[Name,setName] = useState("");
    const[phone,setPhone] = useState("");
    const[price,setPrice] = useState("");
    const[theOfferRatio,setTheOfferRatio] = useState("");
    const[offer,setOffer] = useState("");
    const[created,setCreated] = useState("");
    const[brand,setbrand] = useState("");
    const[roomNumbers, setRoomNumbers] = useState(1)


    let mobileCode = phone.substring(0, 3);
    console.log(mobileCode);
    let validMobileCode =
      mobileCode == "010" ||
      mobileCode == "011" ||
      mobileCode == "012" ||
      mobileCode == "015"
        ? true
        : false;
    console.log(validMobileCode);


// Error Object for Validation
    const [errors, setErrors] = useState({
      brandName: "",
      serviceName: "",
      serviceDescripition: "",
      servicePrice: "",
      servicePhone: "",
      catagory: "",
    });

    let catgory = search.split('=')[2];
    let itemId = search.split('&')[0].split('=')[1];


    //our functions 
    function editeService(e) {
      e.preventDefault();
      try{
      console.log("ggg");
      if( Name === ""
      ||descripition ===""
      || price ===""
      || price === "0"
      || phone === ""
      || phone.length !== 11
      ||brand === ""
      ||validMobileCode === false
      ||imgPath === ""
      ){
        throw "error"
      }
      editHotelService(catgory, itemId, {
        serviceName: Name,
        serviceDescripition: descripition,
        servicePhone: phone,
        servicePrice:price,
        offerd: offer,
        offerRatio: theOfferRatio,
        createdAt: new Date(),
        createdBy: created,
        imagePath: imgPath,
        brandName:brand,
        roomNumbers:parseInt(roomNumbers)
      });
      history.push(`/${catgory.toLowerCase()}`)

    } catch(err){
      errorSubmitState(e)
    }

  }


  

    function getData(){
      getSingleService(catgory, itemId)
      .then((data)=>{
        const{imagePath,serviceDescripition,serviceName,servicePhone,servicePrice , createdBy , offerRatio , offerd ,brandName , roomNumbers}= data;
        setImgPath(imagePath)
        setDescripition(serviceDescripition)
        setName(serviceName)
        setPhone(servicePhone)
        setPrice(servicePrice)
        setTheOfferRatio(offerRatio)
        setOffer(offerd)
        setCreated(createdBy)
        setbrand(brandName)
        setRoomNumbers(roomNumbers)
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

    const validateInputs = (e) => {
      if (e.target.name === "serviceName") {
        setErrors({
          ...errors,
          serviceName:
            e.target.value.length === 0 ? "Service name is required" : null,
            
        });
        if(e.target.value.length === 0 ){
           throw "Service name is required"
        }
      }
  
      if (e.target.name === "brandName") {
        setErrors({
          ...errors,
          brandName:
            e.target.value.length === 0 ? "Brand name is required" : null,
        });
      }
  
      if (e.target.name === "catgoryName") {
        console.log(e.target.name)
        setErrors({
          ...errors,
          catagory:
            e.target.value === "default" ? "Please Specifiy a category" : null,
        });
      }
      if (e.target.name === "serviceDescripition") {
        setErrors({
          ...errors,
          serviceDescripition:
            e.target.value.length === 0
              ? "Service description is required"
              : null,
        });
      }
    
      if (e.target.name === "servicePrice") {
        setErrors({
          ...errors,
          servicePrice:
            e.target.value.length === 0
              ? "Service price is required"
              : parseInt(e.target.value) === 0
              ? "Price must be more than 0"
              : null,
        });
        console.log(typeof(e.target.value))
      }
  
      if (e.target.name === "servicePhone") {
        setErrors({
          ...errors,
          servicePhone:
            e.target.value.length === 0
              ? "Service phone Number is required"
              : e.target.value.length !== 11
              ? "Service phone Number must be 11 Number"
              : !validMobileCode
              ? "Phone Number must start with a valid code"
              : null,
        });
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

    function errorSubmitState(e){
      console.log(e)
      setErrors({
        ...errors,
        brandName:
          e.target[0].value === ""? "Brand name is required" : null,
        serviceName:
          e.target[1].value=== "" ? "Service name is required" : null,
        catagory:
          e.target[2].value === "" ? "Please Specifiy a category" : null,
        serviceDescripition:
          e.target[3].value === ""
            ? "Service description is required"
            : null,
        servicePrice:
            e.target[4].value.length === 0
              ? "Service price is required"
              : e.target[4].value == 0
              ? "Price must be more than 0"
              : null,
        servicePhone:
              e.target[5].value.length === 0
                ? "Service phone Number is required"
                : e.target[5].value.length !== 11
                ? "Service phone Number must be 11 Number"
                : !validMobileCode
                ? "Phone Number must start with a valid code"
                : null,
      });
    }

    return ( 
  <>
    <Container className="mt-1">
      <section className="h-100 h-custom">
        <div className="container  h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-8">
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
                     Edit Service
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
                        onBlur={(e) => validateInputs(e)}
                     
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
                        placeholder="Service Name"
                        onBlur={(e) => validateInputs(e)}
                        name="serviceName"
                        value={Name}
                        onChange={(e)=>{setName(e.target.value)}}
                      />
                      {errors.serviceName ? (
                        <small className="text-danger ms-1">
                          {errors.serviceName}
                        </small>
                      ) : null}{" "}
                    </div>
                    <div className="mb-4">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Room Number"
                        onBlur={(e) => validateInputs(e)}
                        name="roomNumber"
                        value={roomNumbers}
                        onChange={(e)=>{setRoomNumbers(e.target.value)}}
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
                        onBlur={(e) => validateInputs(e)}
                        name="serviceDescripition"
                        value={descripition}
                        onChange={(e)=>{setDescripition(e.target.value)}}
                      />
                      {errors.serviceDescripition ? (
                        <small className="text-danger ms-1">
                          {errors.serviceDescripition}
                        </small>
                      ) : null}
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Price"
                            name="servicePrice"
                            onBlur={(e) => validateInputs(e)}
                            value={price} 
                            onChange={(e)=>{setPrice(e.target.value)}}
                          />
                        {errors.servicePrice ? (
                          <small className="text-danger ms-1">
                            {errors.servicePrice}
                          </small>
                        ) : null}
                      </div>
                      <div className="col-md-6 mb-4">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Phone Number"
                            onBlur={(e) => validateInputs(e)}
                            name="servicePhone"
                            value={phone}
                            onChange={(e)=>{setPhone(e.target.value)}}
                          />
                          {errors.servicePhone ? (
                            <small className="text-danger ms-1">
                              {errors.servicePhone}
                            </small>
                          ) : null}
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
                      Save Changes
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
