import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../Firebase";
import { doc, getFirestore, collection } from "firebase/firestore";
import app from "../../Firebase";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "../../components/ContactUs/ContactUs.css";
import "./CreateService.css";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBIcon, MDBBtn } from 'mdbreact';


function CreateService() {
  const serviceNameRef = useRef();
  const serviceDescripitionRef = useRef();
  const servicePriceRef = useRef();
  const servicePhoneRef = useRef();
  const serviceImage = useRef();
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState('')
  const [catagory, setCatagory] = useState('default');
  const { currentUser, logout, setService, getAllUserService } = useAuth();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const db = getFirestore(app);
  const serviceCollectionRef = collection(db, catagory);

  function handelChange(e) {
    if (e.target.files[0]) {
      Object.defineProperty(e.target.files[0], 'name', {
        writable: true,
        value: new Date()

      })
      setImage(e.target.files[0])
      console.log(image)
    }
  }

  function handelCatgory(e) {
    setCatagory(e.target.value)
  }

  console.log(catagory)

  function clearValues() {
    serviceNameRef.current.value = "";
    serviceDescripitionRef.current.value = "";
    servicePriceRef.current.value = '';
    servicePhoneRef.current.value = '';
    setProgress(0)
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
          setUrl(downloadURL)
        });
      }
    )
  }

  console.log(url)

  async function handelSubmit(e) {
    console.log(url)
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await setService(serviceCollectionRef, {
        serviceName: serviceNameRef.current.value,
        serviceDescripition: serviceDescripitionRef.current.value,
        servicePrice: servicePriceRef.current.value,
        servicePhone: servicePhoneRef.current.value,
        imagePath: url,        
      })

      console.log("ko")
     
      console.log('done')
    } catch (error) {
      console.log(error);
      setError("Failed to create an service");
    }
    setLoading(false);
    clearValues();
    history.push(`/${catagory.toLowerCase()}`)

  }


  useEffect(()=>{
    document.title = "Create Services"

  })


  return (
    <Container className="mt-5">
      {/* <div className="row">
        <div className="col-md-12">
          <Card
            className="card-image"
            style={
              {
              backgroundImage:"url(https://i.pinimg.com/564x/0d/17/83/0d178380d5b058a37584d1804820c589.jpg)",
             //   backgroundRepeat: "no-repeat"
              }
            }
          >
            <div className="rgba-stylish-strong py-5 px-5 z-depth-4">
              <div className="text-center">
                <h3 className="font-weight-bold">
                  <strong>Create Your </strong>
                  <a href="#!" className="text-primary font-weight-bold">
                    <strong>Service</strong>
                  </a>
                </h3>
              </div>
              {error && <Alert variant="danger">{error}</Alert>}       
              <form onSubmit={handelSubmit}>
                         
                <Form.Group id="Service_Name">
                  <Form.Label className="text-primary font-weight-bold">
                    Service name
                  </Form.Label>                       
                  <Form.Control
                    validate
                    labelClass="white-text"
                    type="text"
                    ref={serviceNameRef}
                    required
                    placeholder="Enter Your Service Name"
                  />                       
                </Form.Group>

                
                <Form.Control as="select"aria-label="Floating label select example" className="mt-3 mb-3" onChange={(e)=>handelCatgory(e)}>
                <Form.Label className="text-primary font-weight-bold">
                    Service Category
                  </Form.Label>                     
                  <option> choose your service catgory </option>
                  <option value="Rent">Rent</option>
                  <option value="Hotels">Hotels</option>
                  <option value="Restaurants">Restaurants</option>
                </Form.Control>
            
                                         
                <Form.Group id="Service_Descripition">
                  <Form.Label className="text-primary font-weight-bold">
                    Service Descripition
                  </Form.Label>               
                  <Form.Control
                    type="text"
                    ref={serviceDescripitionRef}
                    required
                    style={{height:"8rem"}}
                    placeholder="Enter Your Service description"
                  />
                </Form.Group>
                         
                <Form.Group id="Service_Price">
                  <Form.Label className="text-primary font-weight-bold">
                    Service Price
                  </Form.Label>   
                <Form.Control type="number" ref={servicePriceRef} required className="col-md-2" placeholder="Enter Your Service Price" style={{height:"2rem"}}/>      
                </Form.Group>
                         
                <Form.Group id="Phone_Number">
                  <Form.Label className="text-primary font-weight-bold">
                    Phone Number
                  </Form.Label>                     
                  <Form.Control type="number" ref={servicePhoneRef} required placeholder="Enter Your Phone Number"/> 
                         
                </Form.Group>
                <Form.Group id="Service_Image">   
                <label className="text-primary font-weight-bold mb-2">Service Image </label>          
                  <MDBInput 
                    type="file"
                    required
                    onChange={handelChange}
                />
                  <Button onClick={handelUpload} className="btn-upload-gradiant mt-5">Upload</Button>
                </Form.Group>
                         
                <Button  type="submit" className="w-100 btn-upload-gradiant mt-5">
                 Let's Create your Service
                </Button>
                       
              </form>
                   
            </div>
          </Card>
        </div>
      </div> */}

  <section class="h-100 h-custom" style={{backgroundColor: "#8fc4b7"}}>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-8 col-xl-6">
        <div class="card rounded-3">
          <img src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-registration/img3.jpg" class="w-100" style={{borderTopLeftRadius: ".3rem", borderTopRightRadius: ".3rem"}} alt="Sample photo"/>
          <div class="card-body p-4 p-md-5">
            <h3 class="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2"> Create Your Service</h3>

            <form class="px-md-2">

              <div class="form-outline mb-4">
                <input type="text" id="form3Example1q" class="form-control" />
                <label class="form-label" for="form3Example1q">Name</label>
              </div>

              <div class="row">
                <div class="col-md-6 mb-4">

                  <div class="form-outline datepicker">
                    <input
                      type="text"
                      class="form-control"
                      id="exampleDatepicker1"
                    />
                    <label for="exampleDatepicker1" class="form-label">Select a date</label>
                  </div>

                </div>
                <div class="col-md-6 mb-4">
                  <select class="select">
                    <option value="1" disabled>Gender</option>
                    <option value="2">Female</option>
                    <option value="3">Male</option>
                    <option value="4">Other</option>
                  </select>
                </div>
              </div>

              <div class="mb-4">

                <select class="select">
                  <option value="1" disabled>Class</option>
                  <option value="2">Class 1</option>
                  <option value="3">Class 2</option>
                  <option value="4">Class 3</option>
                </select>

              </div>

              <div class="row mb-4 pb-2 pb-md-0 mb-md-5">
                <div class="col-md-6">

                  <div class="form-outline">
                    <input type="text" id="form3Example1w" class="form-control" />
                    <label class="form-label" for="form3Example1w">Registration code</label>
                  </div>

                </div>
              </div>

              <button type="submit" class="btn btn-success btn-lg mb-1">Submit</button>

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

export default CreateService;
