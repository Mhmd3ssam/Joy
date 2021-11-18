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
  const[imgPath,setImgPath] = useState("");
  const[descripition,setDescripition] = useState("");
  const[Name,setName] = useState("");
  const[phone,setPhone] = useState("");
  const[price,setPrice] = useState("");


  const { getAllUserService, editAllServicesFields , getSingleService} = useAuth();
  const db = getFirestore(app);
  const serviceCollectionRef = collection(db, "Restaurants");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  
  
  const handleClose = () => setShow(false);
  const handleShow = (id) => 
  {
    setShow(true) 
    getSingleService("Restaurants", id)
    .then((data)=>{
      const{imagePath,serviceDescripition,serviceName,servicePhone,servicePrice}= data;
      setImgPath(imagePath)
      setDescripition(serviceDescripition)
      setName(serviceName)
      setPhone(servicePhone)
      setPrice(servicePrice)
    })
  };


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
  imagePath: "https://firebasestorage.googleapis.com/v0/b/jooy-dadba.appspot.com/o/images%2FWed%20Nov%2017%202021%2022%3A32%3A03%20GMT%2B0200%20(Eastern%20European%20Standard%20Time)?alt=media&token=d7a6a096-8a60-4155-bd62-c53d10f9c577"
  serviceDescripition: "Res"
 

     */
  let comp = rent.map((res) => {
    const {imagePath, serviceName, servicePhone, offerd, offerRatio, id, createdBy, serviceDescripition } = res;
    return (
      <Container>
        <div className="row">
          <div className="col-md-12">
            <div className="card text-center me-3 " key={id} >
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
              <Button variant="primary" onClick={()=>{handleShow(id)}} >
                Launch demo modal
              </Button>
            </div>
          </div>
        </div>


        {/* Modal */}
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
                        backgroundImage: "url(https://i.pinimg.com/564x/0d/17/83/0d178380d5b058a37584d1804820c589.jpg)",
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
                            required
                            placeholder="Enter Your Service Name"
                            value={Name}
                            onChange={(e)=>{setName(e.target.value)}}
                          />
                        </Form.Group>

                        <Form.Group id="Service_Descripition">
                          <Form.Label className="text-primary font-weight-bold">
                            Service Descripition
                          </Form.Label>
                          <Form.Control
                            type="text"
                            required
                            value={descripition}
                            style={{ height: "8rem" }}
                            placeholder="Enter Your Service description"
                          />
                        </Form.Group>

                        <Form.Group id="Service_Price">
                          <Form.Label className="text-primary font-weight-bold">
                            Service Price
                          </Form.Label>
                          <Form.Control type="number" value={price} required className="col-md-2" placeholder="Enter Your Service Price" style={{ height: "2rem" }} />
                        </Form.Group>

                        <Form.Group id="Phone_Number">
                          <Form.Label className="text-primary font-weight-bold">
                            Phone Number
                          </Form.Label>
                          <Form.Control type="number" value={phone}required placeholder="Enter Your Phone Number" />

                        </Form.Group>
                        <Form.Group id="Service_Image">
                          <label className="text-primary font-weight-bold mb-2">Service Image </label>
                          <MDBInput
                            type="file"
                            required
                          />
                          <Button className="btn-upload-gradiant mt-5">Upload</Button>
                        </Form.Group>

                        <Button type="submit" className="w-100 btn-upload-gradiant mt-5">
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
