import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { collection, getFirestore, doc, deleteDoc } from "@firebase/firestore";
import app from "../../Firebase";
 import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBIcon, MDBBtn } from 'mdbreact';
import "./hotels.scss";



const Hotels = () => {
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
  const serviceCollectionRef = collection(db, "Hotels");


  function editeService(id) {
    console.log("ggg");
    editAllServicesFields("Hotels", id, {
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
    const alyDocRef = doc(db, "Hotels", documentId);
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
    document.title = "Hotels"

  }, [counter]);

  let comp = rent.map((res) => {
    const {imagePath, serviceName, servicePhone, offerd, offerRatio, id, createdBy, serviceDescripition, createdAt } = res;
    const creationTime = new Date(createdAt.seconds)
    return (
      <Container>
        <div className="row">
          <div className="col-12">
            {/* <div className="card text-center me-3 " key={id} >
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
                <Link className="btn btn-outline-info" to={`/editItem?id=${id}&name=Hotels`}>
                  Edit item
                </Link>
                <Link className="btn btn-outline-info" to={`/offer?id=${id}&name=Hotels`}>
                Make Offer
                </Link>
              </div>
            </div> */}
        
		<article class="postcard light green">

        <a class="postcard__img_link">
				<img class="postcard__img" src={imagePath} alt="Image Title" />
			</a>
			
			<div class="postcard__text t-dark">
				<h1 class="postcard__title green"><a href="#">{serviceName}</a></h1>
				<div class="postcard__subtitle small">
					<time>
						<i class="fas fa-calendar-alt mr-2"></i>Created at: {creationTime.toString()}
					</time>
				</div>
				<div class="postcard__bar"></div>
				<div class="postcard__preview-txt">{serviceDescripition}</div>
				<ul class="postcard__tagbox">
					<li   onClick={() => {
                    deletService(id);
                  }} class="tag__item del"><i class="fas fa-tag mr-2"></i> 
                  Delete item
                </li>
                <li class="tag__item edit"><i class="fas fa-tag mr-2"></i> 
                <Link to={`/editItem?id=${id}&name=Hotels`}>
                  Edit service details
                </Link>
                </li>
					<li class="tag__item offer">
                    <Link to={`/offer?id=${id}&name=Hotels`}>
                <i class="fas fa-play mr-2"></i>Add an offer</Link>
					</li>
                    <li class="tag__item more">
                    <Link to={`/details?id=${id}&name=Hotels`}>
                <i class="fas fa-play mr-2"></i>See more</Link>
					</li>
				</ul>
			</div>
		</article>
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

export default Hotels;
