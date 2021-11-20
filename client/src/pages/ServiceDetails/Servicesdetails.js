import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Link, useLocation, useHistory } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import { collection, getFirestore, doc, deleteDoc } from "@firebase/firestore";
import app from "../../Firebase";

export default function Servicesdetails() {
    const { search } = useLocation();
    const { editAllServicesFields, getSingleService } = useAuth();

    //state
    const [imgPath, setImgPath] = useState("");
    const [descripition, setDescripition] = useState("");
    const [Name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [price, setPrice] = useState("");
    const [theOfferRatio, setTheOfferRatio] = useState("");
    const [offer, setOffer] = useState("");
    const [created, setCreated] = useState("");
    const [deleteItem, setDeleteItem] = useState(false);

    let catgory = search.split('=')[2];
    let itemId = search.split('&')[0].split('=')[1];
    const db = getFirestore(app);

    const history = useHistory();

    console.log(catgory)
    console.log(itemId)

    //our functions 
    function getData() {
        getSingleService(catgory, itemId)
            .then((data) => {
                console.log(data)
                const { imagePath, serviceDescripition, serviceName, servicePhone, servicePrice, createdBy, offerRatio, offerd } = data;
                setImgPath(imagePath)
                setDescripition(serviceDescripition)
                setName(serviceName)
                setPhone(servicePhone)
                setPrice(servicePrice)
                setTheOfferRatio(offerRatio)
                setOffer(offerd)
                setCreated(createdBy)
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
                            <div id="mdb-lightbox-ui"></div>
                            <div class="mdb-lightbox">
                                <div class="row product-gallery mx-1">
                                    <div class="col-12 mb-0">
                                        <figure class="view overlay rounded z-depth-1 main-img">
                                            <img src={imgPath}
                                                class="img-fluid z-depth-1" />
                                        </figure>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <h2>
                             {Name}
                             <span class="badge bg-warning rounded-pill d-inline-block ms-3 fs-6">
                               <Link to={`/${catgory.toLowerCase()} `}> {catgory} </Link> 
                            </span>
                            </h2>
                            <p class="mb-2 text-muted text-uppercase small">{phone}</p>
                            <p><span class="mr-1"><strong>{price} <span className="d-inline-block ms-1 fs-6">EGP</span> </strong></span></p>
                            <p class="pt-1">
                                {descripition}
                            </p>
                            <div class="table-responsive">
                                <table class="table table-sm table-borderless mb-0">
                                <tbody>
                                    <tr>
                                    <th class="pl-0 w-25" scope="row"><strong>Created At</strong></th>
                                    <td>Shirt 5407X</td>
                                    </tr>
                                    <tr>
                                    <th class="pl-0 w-25" scope="row"><strong>Color</strong></th>
                                    <td>Black</td>
                                    </tr>
                                    <tr>
                                    <th class="pl-0 w-25" scope="row"><strong>Delivery</strong></th>
                                    <td>USA, Europe</td>
                                    </tr>
                                </tbody>
                                </table>
                            </div>
                            <hr />
                            <button type="button" class="btn btn-warning btn-md mr-1 mb-2 me-4">
                                <Link to={`/offer?id=${itemId}&name=${catgory}`}>  Make Offer</Link>
                            </button>
                            <button type="button" class="btn btn-primary btn-md mr-1 mb-2 me-4">
                                <Link to={`/editItem?id=${itemId}&name=${catgory}`}> Edit Service</Link>
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
