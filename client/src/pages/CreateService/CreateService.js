import React, { useState, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import { getFirestore, collection } from "firebase/firestore";
import app from "../../Firebase";
import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import "../../components/ContactUs/ContactUs.css";
import "./CreateService.css";


function CreateService() {
  //Inputs Refs
  const serviceNameRef = useRef();
  const brandeNameRef = useRef();
  const serviceDescripitionRef = useRef();
  const servicePriceRef = useRef();
  const servicePhoneRef = useRef();
  const serviceImage = useRef();

  //Input States
  const[serviceName, setServiceName] = useState("");
  const[brandeName, setServiceBrandeName] = useState("");
  const[serviceDescripition, setServiceDescripition] = useState("");
  const[servicePrice, setServicePrice] = useState("");
  const[servicePhone, setServicePhone] = useState("");
  const [catagory, setCatagory] = useState("default");
  
  const [errors, setErrors] = useState({
    serviceName: "",
    brandeName: "",
    serviceDescripition: "",
    servicePrice: "",
    servicePhone: "",
    catagory:""
  });

  console.log(serviceName)

  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");
  const { setService } = useAuth();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const db = getFirestore(app);
  const serviceCollectionRef = collection(db, catagory);

  function handelChange(e) {
    setProgress(0)
    if (e.target.files[0]) {
      Object.defineProperty(e.target.files[0], "name", {
        writable: true,
        value: new Date(),
      });
      setImage(e.target.files[0]);
      console.log(image);
    }
  }

  async function handelUpload(e) {
    e.preventDefault();
    try{
    setError("");
    const storage = getStorage(app);
    const storageReff = storageRef(storage);
    const imagesRef = storageRef(storageReff, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(imagesRef, image);
    console.log(uploadTask);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
        console.log(prog)
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setUrl(downloadURL);
        });
      }
    );
    }catch(error){
      console.log(error.message)
      setError("Upload Image First")
    }
  
    
  }

  console.log(url);

  async function handelSubmit(e) {
    console.log(url);
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await setService(serviceCollectionRef, {
        serviceName: serviceNameRef.current.value,
        serviceDescripition: serviceDescripitionRef.current.value,
        servicePrice: servicePriceRef.current.value,
        servicePhone: servicePhoneRef.current.value,
        brandName:brandeNameRef.current.value,
        imagePath: url,
      });

      console.log("ko");

      console.log("done");
    } catch (error) {
      console.log(error);
      setError("Failed to create an service");
    }
    setLoading(false);
    history.push(`/${catagory.toLowerCase()}`);
  }
  const handleInputChange = (e)=>{
    if (e.target.name === "serviceName") {
      setServiceName(e.target.value )
    }
    setErrors({
      ...errors,
      serviceName: e.target.value.length === 0 ? "Service name is required" : null,
    });
    
  }
  useEffect(() => {
    document.title = "Create Services";
  });
  let progressComp = ()=>{
    return(
      <div class="progress">
      <div
        class="progress-bar progress-bar-striped progress-bar-animated"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
        style={{width:`${progress}%`}}
      ></div>
    </div>
    )
  }
  return (
    <Container className="mt-5">
      <section className="h-100 h-custom">
        <div className="container  h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-8 ">
              <div className="card rounded-3">
                <img
                  src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-registration/img3.jpg"
                  className="w-100"
                  style={{
                    borderTopLeftRadius: ".3rem",
                    borderTopRightRadius: ".3rem",
                  }}
                  alt="Sample photo"
                />
                <div className="card-body  ">
                  <h3 className="mb-4 pb-2 pb-md-0  px-md-2 text-center text-primary">
                    Create Your Service.
                  </h3>
                  <form className="px-md-2">
                    <div className=" mb-4">
                      <input
                        type="text"
                        id="brand"
                        className="form-control"
                        placeholder="Brand Name"
                        ref={brandeNameRef}
                        onChange={(e)=>{setServiceBrandeName(e.target.value)}}
                        value={brandeName}
                        name="brandeName"

                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="text"
                        id="service"
                        className="form-control"
                        placeholder="Service Name"
                        ref={serviceNameRef}
                        onChange={(e)=>{handleInputChange(e)}}
                        onBlur={(e)=>{handleInputChange(e)}}
                        value={serviceName}
                        name="serviceName"
                      />
                      {errors.serviceName ? errors.serviceName : null }
                    </div>
                    <div className="mb-4">
                      <select className="form-select" onChange={(e)=>setCatagory(e.target.value)} name="catgoryName">
                        <option disabled selected>
                          choose your service catgory
                        </option>
                        <option value="Rent">Rent</option>
                        <option value="Hotels">Hotels</option>
                        <option value="Restaurants">Restaurants</option>
                      </select>
                    </div>
                    <div className=" mb-4">
                      <textarea
                        id=""
                        className="form-control"
                        placeholder="Service Details"
                        rows="5"
                        ref={serviceDescripitionRef}
                        onChange={(e)=>setServiceDescripition(e.target.value)}
                        value={serviceDescripition}
                        name="serviceDescripition"

                      />
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className=" datepicker">
                          <input
                            type="number"
                            className="form-control"
                            id="Price"
                            placeholder="Price"
                            ref={servicePriceRef}
                            value={servicePrice}
                            name="servicePrice"
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className=" datepicker">
                          <input
                            type="number"
                            className="form-control"
                            id="Phone_Number"
                            placeholder="Phone Number"
                            ref={servicePhoneRef}
                            onChange={(e)=>setServicePhone(e.target.value)}
                            value={servicePhone}
                            name="servicePhone"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="input-group mb-3">
                      <input
                        type="file"
                        class="form-control"
                        id="Image"
                        placeholder="Upload Image"
                        onChange={handelChange}
                      />
                      <button className="btn btn-primary "onClick={handelUpload} disabled={(progress === 100)?true:false}>{(progress === 100)?"Uploaded":"Upload"}</button>
                    </div>
                    <span className="text-danger">{error}</span>
                    {progress === 0 ? null : (progress > 0 && progress <100) ? progressComp():(progress === 100)?<>Image Uploaded <img src="https://img.icons8.com/nolan/96/photoshoot-completed.png" width="20"/></> : null }
                    <button
                      type="submit"
                      className="btn btn-primary w-100 btn-lg mb-1 mt-4"
                      onClick={handelSubmit}
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
  );
}

export default CreateService ;