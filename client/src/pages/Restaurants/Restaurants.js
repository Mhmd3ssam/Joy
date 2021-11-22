import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { collection, getFirestore, doc, deleteDoc } from "@firebase/firestore";
import app from "../../Firebase";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBBtn,
} from "mdbreact";
import "../Hotels/hotels.css"
import Loader from "../../components/Loader/Loader";

const Restaurants = () => {
  const [rent, setRent] = useState([]);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState("");

  const [counter, setCounter] = useState(0);
  const history = useHistory();

  const [imgPath, setImgPath] = useState("");
  const [descripition, setDescripition] = useState("");
  const [Name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [price, setPrice] = useState("");
  const [theOfferRatio, setTheOfferRatio] = useState("");
  const [offer, setOffer] = useState("");
  const [created, setCreated] = useState("");

  console.log(Name);
  console.log(phone);
  console.log(price);
  console.log(descripition);

  const { getAllUserService, editAllServicesFields } = useAuth();
  const db = getFirestore(app);
  const serviceCollectionRef = collection(db, "Restaurants");

  function editeService(id) {
    console.log("ggg");
    editAllServicesFields("Restaurants", id, {
      serviceName: Name,
      serviceDescripition: descripition,
      servicePhone: phone,
      servicePrice: price,
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
    document.title = "Restaurants";
  }, [counter]);

  let comp = rent.map((res) => {
    const {
      imagePath,
      serviceName,
      servicePhone,
      servicePrice,
      offerd,
      offerRatio,
      id,
      createdBy,
      serviceDescripition,
      createdAt,
    } = res;
    let sale = (Number(servicePrice) * Number(offerRatio)) / 100
    let newprice = Number(servicePrice) - sale

    console.log(newprice)
    const creationTime = new Date(createdAt.seconds);
    return (
      <div className="col-md-4 col-sm-6">
        <div class="card bg-light position-relative p-0 card-round">
          <div>
            <img class="img-fluid w-100 hotel-img card-round" src={imagePath} alt="Sample" />
            <div class="mb-0 pb-0 position-absolute top-0 start-0 ms-1 mt-1 ">
              {offerd ? (
                <span class="badge bg-warning rounded-pill">
                  Sale {offerRatio}%
                </span>
              ) : (
                ""
              )}
            </div>
            <a>
              <div class="mask">
                <div class="mask rgba-black-slight"></div>
              </div>
            </a>
          </div>

          <div class="card-body text-center">
            <h5>{serviceName}</h5>
            <p class="small text-muted text-uppercase mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="me-2 bi bi-telephone-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" /></svg>
              {servicePhone}
            </p>
            <hr />
            <h6 class="mb-3">
              <span class="text-danger mr-1">{offerRatio ? `${parseInt(newprice)} EGP` : `${servicePrice} EGP`}</span>
              <span class="text-grey ms-2">
                <s>{offerRatio ? `${servicePrice} EGP` : ""}</s>
              </span>
            </h6>
            <button type="button" class="btn btn-primary btn-sm mr-1 mb-2">
              <i class="fas fa-info-circle pr-2"></i>
              <Link to={`/details?id=${id}&name=Restaurants`}>See More </Link>
            </button>
            <button
              onClick={() => {
                deletService(id);
              }}
              type="button"
              class="btn btn-danger btn-sm px-3 mb-2 ms-1 material-tooltip-main"
              data-toggle="tooltip"
              data-placement="top"
              title="Add to wishlist"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" /></svg>

            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <Container>
      <div className="row">
        {load ? (
          <div className="row d-flex justify-content-center align-items-center min-vh-100">
              <Loader/>
          </div>
        ) : rent.length == 0 ? (
          <>
          <h4 className="row d-flex justify-content-center align-items-center min-vh-100 text-center bosition">
            You don't have any services yet !! 
          </h4>
          <h6 className=" text-center bosition_1">
            <Link to={`/layout/create?name=restaurants`}>Creat One</Link>
          </h6>
        </>
        ) : (
          comp
        )}
      </div>
    </Container>
  );
};

export default Restaurants;
