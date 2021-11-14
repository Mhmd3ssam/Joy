import React, { useState, useEffect, useRef } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom"
import { auth } from "../Firebase";
import { doc, getFirestore, collection } from "firebase/firestore";
import app from "../Firebase";
import { getStorage , ref as storageRef, uploadBytes, getDownloadURL} from "firebase/storage";



export default function Dashboard() {

  const [error, setError] = useState("")
  const { currentUser, logout, setService, getAllUserService } = useAuth()
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const serviceNameRef = useRef();
  const serviceDescripitionRef = useRef();
  const servicePriceRef = useRef();
  const servicePhoneRef = useRef();
  const serviceImage = useRef();
  const [image,setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");

 



  const db = getFirestore(app);
  const serviceCollectionRef = collection(db, "service");


  // Retrieve Service Documents 
  // (async (serviceCollectionRef)=>{
  //   await console.log(getAllUserService(serviceCollectionRef)) 
  // })(serviceCollectionRef)
  // const alyDocRef = doc(db, "service", "7755pDJQy3rSZg4pIFEi");

  function handelChange(e) {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
      console.log(image)
    }
    
  }

  async function handelUpload(){
    const storage = getStorage(app);
    const storageReff = storageRef(storage);
    const imagesRef = storageRef(storageReff,`images/${image.name}`);
    uploadBytes(imagesRef,image )
    let result = getDownloadURL(imagesRef).then((downloadURL) => {
      console.log("File available at", downloadURL);
      return downloadURL;
    });
    return result;
  }

  async function handelSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      let path = await handelUpload();
      await setService(serviceCollectionRef, {
        serviceName: serviceNameRef.current.value,
        serviceDescripition: serviceDescripitionRef.current.value,
        servicePrice: servicePriceRef.current.value,
        servicePhone: servicePhoneRef.current.value,
        imagePath:path
      })

      history.push("/dashboard")
      console.log('done')
    } catch (error) {
      console.log(error);
      setError("Failed to create an service");
    }
    setLoading(false);
  }

  async function handleLogout() {
    setError("");
    try {
      await logout(auth)
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }



  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-between"
        style={{ minHeight: "100vh" }}
      >
        <Card className="w-100" style={{ maxWidth: "400px" }}>
          <Card.Body>

            <h2 className="text-center mb-4"> Make Service</h2>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handelSubmit}>

              <Form.Group id="Service_Name">
                <Form.Label> Service name </Form.Label>
                <Form.Control type="text" ref={serviceNameRef} required />
              </Form.Group>

              <Form.Group id="Service_Image">
                <Form.Label> Service Image </Form.Label>
                <Form.Control type="file" accept=".png, .jpg, .jpeg"  required  onChange={handelChange}/>
              </Form.Group>
                
              <Form.Group id="Service_Descripition">
                <Form.Label> Service Descripition </Form.Label>
                <Form.Control type="text" ref={serviceDescripitionRef} required />
              </Form.Group>

              <Form.Group id="Service_Price">
                <Form.Label> Service Price</Form.Label>
                <Form.Control type="number" ref={servicePriceRef} required />
              </Form.Group>

              <Form.Group id="Phone_Number">
                <Form.Label> Phone Number </Form.Label>
                <Form.Control type="number" ref={servicePhoneRef} required />
              </Form.Group>

              <Button type="submit" className="w-100 mt-4">
                Submit
              </Button>

            </Form>
          </Card.Body>
        </Card>
      </Container>

      <Card>

        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger"> {error}</Alert>}
          <strong>Email:</strong>{currentUser ? currentUser.email : ""}
          <strong>Password:</strong>{currentUser ? currentUser.password : ""}
          <div>
            {currentUser.englishUserName}
          </div>
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>

      </Card>

      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}> Log Out</Button>
      </div>

    </>
  )
}
