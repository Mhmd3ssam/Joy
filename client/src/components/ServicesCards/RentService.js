import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

import "./card-style.css";
import { useAuth } from "../../context/AuthContext";
import { collection, getFirestore, doc, deleteDoc } from "@firebase/firestore";
import app from "../../Firebase";
// import Modal from 'react-bootstrap/Modal';
 import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBIcon, MDBBtn } from 'mdbreact';


const RentService = () => {
  const [rent, setRent] = useState([]);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState("");

  const [counter, setCounter] = useState(0);
  const history = useHistory();

  const[imgPath,setImgPath] = useState("");
  const[descripition,setDescripition] = useState("");
  const[Name,setName] = useState("");
  const[phone,setPhone] = useState("");
  const[price,setPrice] = useState("");
  const[theOfferRatio,setTheOfferRatio] = useState("");
  const[offer,setOffer] = useState("");
  const[created,setCreated] = useState("");

  console.log(Name)
  console.log(phone)
  console.log(price)
  console.log(descripition)


  const { getAllUserService, editAllServicesFields } = useAuth();
  const db = getFirestore(app);
  const serviceCollectionRef = collection(db, "Rent");


  function editeService(id) {
    console.log("ggg");
    editAllServicesFields("Rent", id, {
      serviceName: Name,
      serviceDescripition: descripition,
      servicePhone: phone,
      servicePrice:price,
      offerd: offer,
      offerRatio: theOfferRatio,
      createdAt: new Date(),
      createdBy: created,
      imagePath: imgPath,
    });
    setCounter(counter + 1);
  }

  async function deletService(documentId) {
    console.log(documentId);
    const alyDocRef = doc(db, "Rent", documentId);
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
    document.title = "Rent"

  }, [counter]);

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
                <Link className="btn btn-outline-info" to={`/editItem?id=${id}&name=Rent`}>
                  Edite item
                </Link>
                <Link className="btn btn-outline-info" to={`/offer?id=${id}&name=Rent`}>
                  Make Offer
                </Link>
              </div>
            </div>
          </div>
        </div>
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
