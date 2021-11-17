import React, { useState, useEffect, useRef } from "react";
import "./card-style.css";
import { useAuth } from "../../context/AuthContext";
import { collection, getFirestore, doc, deleteDoc } from "@firebase/firestore";
import app from "../../Firebase";
import Modal from 'react-bootstrap/Modal';
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBIcon, MDBBtn } from 'mdbreact';



const RentService = () => {
  const [rent, setRent] = useState([]);
  const [load, setLoad] = useState(true);
  const [counter, setCounter] = useState(0);
  const { getAllUserService, editAllServicesFields } = useAuth();
  const db = getFirestore(app);
  const serviceCollectionRef = collection(db, "Restaurants");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [error, setError] = useState("");
  const serviceNameRef = useRef();
  const serviceDescripitionRef = useRef();
  const servicePriceRef = useRef();
  const servicePhoneRef = useRef();
  const serviceImage = useRef();



  function editeService(id) {
    console.log("ggg");
    editAllServicesFields("Restaurants", id, {
      serviceName: "Reham ",
      serviceDescripition: "Mohamed Essam",
      servicePhone: "",
      servicePrice: "",
      offerd: "",
      offerRatio: "offerRatio",
      createdAt: new Date(),
      createdBy: "auth.currentUser.email",
      imagePath: "",
    });
    setCounter(counter + 1);
  }
  async function deletService(documentId) {
    console.log(documentId);
    const alyDocRef = doc(db, "Restaurants", documentId);
    await deleteDoc(alyDocRef);
    setCounter(counter + 1);
  }

  function getData() {
    getAllUserService(serviceCollectionRef).then((res) => {
      setRent(res);
      setLoad(false);
      console.log(res);
    });
  }

  useEffect(() => {
    getData();
  }, [counter]);

  /**
        createdBy: "ana@gmail.com"
        id: "9xECUjDe5cV2uMYn5sHQ"
        imagePath: "https://firebasestorage.googleapis.com/v0/b/jooy-dadba.appspot.com/o/images%2FMon%20Nov%2015%202021%2019%3A41%3A13%20GMT%2B0200%20(Eastern%20European%20Standard%20Time)?alt=media&token=ce7a03eb-8f91-4e8d-aae5-1a14f0b25d7c"
        offerRatio: null
        offerd: false
        serviceDescripition: "hhhhhh"
        serviceName: "hhhh"
        servicePhone: "01012143511"

        {rent ? comp : null}
     */
  console.log(rent);
  let comp = rent.map((res) => {
    const {
      imagePath,
      serviceName,
      servicePhone,
      offerd,
      offerRatio,
      id,
      createdBy,
      serviceDescripition,
    } = res;
    console.log(id);
    return (
      <Container>
        <div className="row">
          <div className="col-md-12">
            <div className="card text-center me-3 " key={id}>
              <div className="overflow">
                <img src={imagePath} alt="Cataract" className="card-img-top" />
              </div>
              <div className="card-body text-dark">
                <h4 className="card-title">{serviceName}</h4>
                <p className="card-text text-secondary">
                  {serviceDescripition}
                </p>
                <button
                  className="btn btn-outline-info"
                  onClick={() => {
                    deletService(id);
                  }}
                >
                  Delete item
                </button>
                <button
                  className="btn btn-outline-info"
                  onClick={() => {
                    editeService(id);
                  }}
                >
                  {" "}
                  Edite item
                </button>
              </div>
              <Button variant="primary" onClick={handleShow}>
                Launch demo modal
              </Button>
            </div>
          </div>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Your Service</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <Container className="mt-5">
      <div className="row">
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
              <form >
                         
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

                
                <Form.Control as="select"aria-label="Floating label select example" className="mt-3 mb-3" >
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
                  
                  />
                  <Button  className="btn-upload-gradiant mt-5">Upload</Button>

                </Form.Group>
                         
                <Button  type="submit" className="w-100 btn-upload-gradiant mt-5">
                 Let's Create your Service
                </Button>
                       
              </form>
                   
            </div>
          </Card>
        </div>
      </div>

    </Container>




          </Modal.Body>









          <Modal.Footer>
              
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  });

  return (
    <>
      {load ? (
        <h1>Loading...</h1>
      ) : rent.length == 0 ? (
        <h1>you don't have any services yet</h1>
      ) : (
        comp
      )}
    </>
  );
};

export default RentService;
