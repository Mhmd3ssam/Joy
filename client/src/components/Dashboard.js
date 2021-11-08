import React, { useState, useEffect, useRef } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom"
import { auth } from "../Firebase";
import { doc, setDoc, getFirestore , getDocs, addDoc , collection , where, query , updateDoc , deleteDoc} from "firebase/firestore"; 
import app from "../Firebase";


export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout, setService, getAllUserService } = useAuth()
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const serviceNameRef = useRef();
  const serviceDescripitionRef = useRef();
  const servicePriceRef = useRef();
  const servicePhoneRef = useRef();
  const serviceCatgRef = useRef();



  const db = getFirestore(app);
  const serviceCollectionRef = collection(db, "service");


  // retrev 
  (async (serviceCollectionRef)=>{
    await console.log(getAllUserService(serviceCollectionRef)) 
  })(serviceCollectionRef)
  const alyDocRef = doc(db, "service", "7755pDJQy3rSZg4pIFEi");


  



 


  async function handelSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await setService( serviceCollectionRef,{
        serviceName: serviceNameRef.current.value,
        serviceDescripition: serviceDescripitionRef.current.value,
        servicePrice: servicePriceRef.current.value,
        servicePhone: servicePhoneRef.current.value
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

  useEffect(() => {

  })

  return (
    <>
      <Container
        className="d-flex align-items-center   justify-content-between"
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
