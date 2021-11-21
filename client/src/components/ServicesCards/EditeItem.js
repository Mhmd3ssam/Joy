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
    const[offer,setOffer] = useState("");
    const[created,setCreated] = useState("");
    const[brand,setbrand] = useState("");

    let catgory = search.split('=')[2];
    let itemId = search.split('&')[0].split('=')[1];


    //our functions 
    function editeService() {
      console.log("ggg");
      editAllServicesFields(catgory, itemId, {
        serviceName: Name,
        serviceDescripition: descripition,
        servicePhone: phone,
        servicePrice:price,
        offerd: offer,
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
        const{imagePath,serviceDescripition,serviceName,servicePhone,servicePrice , createdBy , offerRatio , offerd ,brandName}= data;
        setImgPath(imagePath)
        setDescripition(serviceDescripition)
        setName(serviceName)
        setPhone(servicePhone)
        setPrice(servicePrice)
        setTheOfferRatio(offerRatio)
        setOffer(offerd)
        setCreated(createdBy)
        setbrand(brandName)
      })
    }

    function handelChange(e) {
      if (e.target.files[0]) {
        Object.defineProperty(e.target.files[0], 'name', {
          writable: true,
          value: new Date()
        })
        setImage(e.target.files[0])
      }
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
          setImgPath(downloadURL)
        });
      }
    )
  }
    useEffect(()=>{
      getData()
      setLoad(false)
    },[])
    console.log(catgory)
    console.log(itemId)
    console.log(Name)
  

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
                    <strong>Edite Your </strong>
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
                        onChange={(e)=>{setDescripition(e.target.value)}}
                        />
                      </Form.Group>
                      <Form.Group id="Service_Price">
                        <Form.Label className="text-primary font-weight-bold">
                          Service Price
                        </Form.Label>
                        <Form.Control type="number" 
                        value={price} required 
                        className="col-md-2" placeholder="Enter Your Service Price"
                        style={{ height: "2rem" }}
                        onChange={(e)=>{setPrice(e.target.value)}}
                        />
                      </Form.Group>
                      <Form.Group id="Phone_Number">
                        <Form.Label className="text-primary font-weight-bold">
                          Phone Number
                        </Form.Label>
                        <Form.Control
                        type="number" 
                        value={phone}
                        onChange={(e)=>{setPhone(e.target.value)}}
                        required 
                        placeholder="Enter Your Phone Number"/>
                      </Form.Group>
                      <Form.Group id="Service_Image">
                        <label className="text-primary font-weight-bold mb-2">Service Image </label>
                        <MDBInput
                          type="file"
                          onChange={handelChange}
                        />
                        <Button className="btn-upload-gradiant mt-5" onClick={handelUpload}>Upload</Button>
                      </Form.Group>
                      <Button  className="w-100 btn-upload-gradiant mt-5" onClick={editeService}>
                        Confirm Edite
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
