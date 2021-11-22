import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../Firebase";
import {  MDBInput } from 'mdbreact';
import {BrowserRouter as Router,Link,useLocation , useHistory} from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function EditeItem() {
  //our state
    const [error, setError] = useState("");
    const [load, setLoad] = useState(true);
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const history = useHistory();

    const { search } = useLocation();
    const {  editAllServicesFields, getSingleService } = useAuth();

    const[imgPath,setImgPath] = useState("");
    const[descripition,setDescripition] = useState("");
    const[Name,setName] = useState("");
    const[phone,setPhone] = useState("");
    const[price,setPrice] = useState("");
    const[theOfferRatio,setTheOfferRatio] = useState("");
    const[created,setCreated] = useState("");
    const[brand,setbrand] = useState("");

    let catgory = search.split('=')[2];
    let itemId = search.split('&')[0].split('=')[1];


    //our functions 
    function Offer() {
      console.log("ggg");
      editAllServicesFields(catgory, itemId, {
        serviceName: Name,
        serviceDescripition: descripition,
        servicePhone: phone,
        servicePrice:price,
        offerd: true,
        offerRatio: theOfferRatio,
        createdAt: new Date(),
        createdBy: created,
        imagePath: imgPath,
        brandName:brand
      });
      history.push(`/${catgory.toLowerCase()}`)

    }

    function getData(){
      getSingleService(catgory, itemId)
      .then((data)=>{
        const{imagePath,serviceDescripition,serviceName,servicePhone,servicePrice , createdBy , offerRatio , offerd , brandName}= data;
        setImgPath(imagePath)
        setDescripition(serviceDescripition)
        setName(serviceName)
        setPhone(servicePhone)
        setPrice(servicePrice)
        setTheOfferRatio(offerRatio)
        setCreated(createdBy)
        setbrand(brandName)
      })
    }


    useEffect(()=>{
      getData()
      setLoad(false)
      document.title = "Offer"

    },[])
    console.log(catgory)
    console.log(itemId)
    console.log(theOfferRatio)
  

    return ( 
      <>
      {load ? <h1>Loading...</h1>:       
      <Container className="mt-5">
        <div className="row">
          <div className="col-md-12">
              <Card className="card-image"
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
                    <strong>Make  Your </strong>
                     <a href="#!" className="text-primary font-weight-bold">
                        <strong>Offer</strong>
                     </a>
                  </h3>
                </div>
                {error && <Alert variant="danger">{error}</Alert>}
              <form >

                <Form.Group id="Service_Price">
                    <Form.Label className="text-primary font-weight-bold">
                          Offer Ratio
                        </Form.Label>
                        <Form.Control type="number" 
                        value={theOfferRatio} required 
                        className="col-md-2" placeholder="Enter Your Service Price"
                        style={{ height: "2rem" }}
                        onChange={(e)=>{setTheOfferRatio(e.target.value)}}
                        />
                      </Form.Group>
                      <Button  className="w-100 btn-upload-gradiant mt-5" onClick={Offer}>
                        Confirm Offer
                      </Button>
                    </form>
                  </div>
                </Card>
              </div>
            </div>
          </Container>}
      </>
  
    )
}
