import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Link, useLocation, useHistory } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import { collection, getFirestore, doc, deleteDoc } from "@firebase/firestore";
import app from "../../Firebase";
import "bootstrap/dist/js/bootstrap.bundle.js"


export default function Servicesdetails() {
    const { search } = useLocation();
    const { editAllServicesFields, getSingleService } = useAuth();

    //state
    const [imagePath, setImgPath] = useState([]);
    const [descripition, setDescripition] = useState("");
    const [Name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [price, setPrice] = useState("");
    const [theOfferRatio, setTheOfferRatio] = useState("");
    const [offer, setOffer] = useState("");
    const [created, setCreated] = useState("");
    const [time, setTime] = useState(null);
    const [deleteItem, setDeleteItem] = useState(false);

    let catgory = search.split('=')[2];
    let itemId = search.split('&')[0].split('=')[1];
    const db = getFirestore(app);

    const history = useHistory();


    //our functions 
    function getData() {
        getSingleService(catgory, itemId)
            .then((data) => {
                console.log(data)
                const { imagePath, serviceDescripition, serviceName, servicePhone, servicePrice, createdBy, offerRatio, offerd, createdAt } = data;
                setImgPath(imagePath)
                setDescripition(serviceDescripition)
                setName(serviceName)
                setPhone(servicePhone)
                setPrice(servicePrice)
                setTheOfferRatio(offerRatio)
                setOffer(offerd)
                setCreated(createdBy)
                setTime(new Date(createdAt.seconds * 1000).toISOString().split('T')[0])
        
        })
     
    }
    async function deletService(itemId) {
        const alyDocRef = doc(db, catgory, itemId);
        await deleteDoc(alyDocRef);
        setDeleteItem(true);
        setTimeout(() => {
            history.push(`./${catgory.toLowerCase()}`)
        }, 2000);
    }


    useEffect(() => {
        getData()
    }, [])
    let comp = () => {
        return (
            <div>
                <section class="mb-5">
                    <div class="row">
                        <div class="col-md-6 mb-4 mb-md-0">
                            {/* <div id="mdb-lightbox-ui"></div> */}
                            {/* <div class="mdb-lightbox">
                                <div class="row product-gallery mx-1">
                                    <div class="col-12 mb-0"> */}
                                            {/* <img src={imagePath}
                                                class="img-fluid z-depth-1" /> */}

<div class="row product-gallery mx-1">

             <div
              id="carouselExampleControls"
              class="carousel slide"
              data-bs-ride="carousel"
            >
              <div class="carousel-inner">
              <div class="carousel-item active">
                        <img
                          class="img-fluid w-100 hotel-img card-round d-block"
                          src={imagePath[imagePath.length-1]}
                          alt="Third slide"
                        />
                      </div>
                {imagePath.map((img, i) => {
                  return (
                    <div key={i} class="carousel-item">
                    {/* <img class="img-fluid w-100 hotel-img card-round " src={img} alt="Sample" /> */}
                    {/* <figure class="view overlay rounded z-depth-1 main-img"> */}

                        <img
                          class="img-fluid w-100 hotel-img card-round d-block"
                          src={img}
                          alt="Third slide"
                        />
                                                                {/* </figure> */}

                    </div>
                  );
                })}
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
              </div>

              </div>


                                    </div>
                                {/* </div>
                           
                        </div> */}
                        <div class="col-md-6">
                            <h2>
                                {Name}
                                <span class="badge bg-warning rounded-pill d-inline-block ms-3 fs-6">
                                    <Link to={`/${catgory.toLowerCase()} `}> {catgory} </Link>
                                </span>
                            </h2>
                            <p class="mb-2 text-muted text-uppercase small">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="me-2 bi bi-telephone-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" /></svg>
                                {phone}</p>
                            <p><span class=""><strong>{price} <span className="d-inline-block ms-1 fs-6 text-success">EGP</span> </strong></span></p>
                            <p class="pt-1">
                                {descripition}
                            </p>
                            <div class="table-responsive">
                                <table class="table table-sm table-borderless mb-0">
                                    <tbody>
                                        <tr>
                                            <th class="pl-0 w-25" scope="row"><strong>Created At</strong></th>
                                            <td>{time}</td>
                                        </tr>
                                        <tr>
                                            <th class="pl-0 w-25" scope="row"><strong>Offerd</strong></th>
                                            <td>
                                                {offer ? <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="green" class="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" /></svg>: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="red" class="bi bi-x" viewBox="0 0 16 16">
                                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                                </svg>}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th class="pl-0 w-25" scope="row"><strong>Offer Ratio</strong></th>
                                            <td>{offer ? `${theOfferRatio}%` : <Link to={`/offer?id=${itemId}&name=${catgory}`} className="text-primary"> Make Offer</Link>}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <hr />
                            { offer?
                            <button type="button" class="btn btn-warning btn-md mr-1 mb-2 me-4">
                                <Link to={`/offer?id=${itemId}&name=${catgory}`} className="text-light"> Edit Offer</Link> 
                            </button>: ""}
                           
                            <button type="button" class="btn btn-primary btn-md mr-1 mb-2 me-4">
                                <Link to={`/eidite${catgory.toLowerCase()}?id=${itemId}&name=${catgory}`}> Edit Service</Link>
                            </button>
                            <button type="button" class="btn btn-danger  btn-md mr-1 mb-2" onClick={() => { deletService(itemId); }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill " viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" /></svg>
                            </button>
                        </div>
                    </div>

                </section>
            </div>
        )
    }

    return (
        <>
            {deleteItem ? <h1>item deleted</h1> : comp()}
        </>
    )
}
