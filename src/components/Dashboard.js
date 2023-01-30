import React, { useState, useEffect, useRef } from "react"
import  Form from "react-bootstrap/Form"
import { Alert,Button, Card,  Container,   } from "react-bootstrap"
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom"
import { auth } from "../Firebase";
import { doc, getFirestore, collection } from "firebase/firestore";
import app from "../Firebase";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";


export default function Dashboard() {

  const { currentUser, logout, setService, getAllUserService } = useAuth()

  const [error, setError] = useState("")
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState('')
  const history = useHistory();
  const [catagory, setCatagory] = useState('default');

  const serviceNameRef = useRef();
  const serviceDescripitionRef = useRef();
  const servicePriceRef = useRef();
  const servicePhoneRef = useRef();
  const imagRef = useRef();




  const db = getFirestore(app);
  const serviceCollectionRef = collection(db, catagory);

  // hotels / resturant / places 
  // Retrieve Service Documents 
  // (async (serviceCollectionRef)=>{
  //   await console.log(getAllUserService(serviceCollectionRef)) 
  // })(serviceCollectionRef)
  // const alyDocRef = doc(db, "service", "7755pDJQy3rSZg4pIFEi");

  function handelChange(e) {

    if (e.target.files[0]) {
      Object.defineProperty(e.target.files[0], 'name', {
        writable: true,
        value: new Date()

      })
      setImage(e.target.files[0])

    }
  }

  function handelCatgory(e) {
    setCatagory(e.target.value)
  }

  console.log(catagory)

  function clearValues() {
    serviceNameRef.current.value = "";
    serviceDescripitionRef.current.value = "";
    servicePriceRef.current.value = '';
    servicePhoneRef.current.value = '';
    setProgress(0)
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
          setUrl(downloadURL)
        });
      }
    )
  }

  console.log(url)


  async function handelSubmit(e) {
    console.log(url)
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await setService(serviceCollectionRef, {
        serviceName: serviceNameRef.current.value,
        serviceDescripition: serviceDescripitionRef.current.value,
        servicePrice: servicePriceRef.current.value,
        servicePhone: servicePhoneRef.current.value,
        imagePath: url
      })

      history.push("/dashboard")
      console.log('done')
    } catch (error) {
      console.log(error);
      setError("Failed to create an service");
    }
    setLoading(false);

    clearValues()


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
                <Form.Control type="file" accept=".png, .jpg, .jpeg" required ref={imagRef} onChange={handelChange} />
                <Button onClick={handelUpload}> Upload</Button>
                <h2>Uploading done {progress}%</h2>
              </Form.Group>

              <Form.Group id="Service_Descripition">
                <Form.Label> Service Descripition </Form.Label>
                <Form.Control type="text" ref={serviceDescripitionRef} required />
              </Form.Group>

              <Form.Group id="Service_Price">
                <Form.Label> Service Price</Form.Label>
                <Form.Control type="number" ref={servicePriceRef} required />
              </Form.Group>

                <Form.Control as="select"aria-label="Floating label select example" onChange={(e)=>handelCatgory(e)}>
                  <option> chose your service catgory </option>
                  <option value="service">service</option>
                  <option value="hotel">hotel</option>
                  <option value="places">places</option>
                </Form.Control>
            

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

























// import React, { useState, useEffect, useRef } from "react"
// import { Form, Button, Card, Alert, Container } from "react-bootstrap"
// import { useAuth } from "../context/AuthContext";
// import { Link, useHistory } from "react-router-dom"
// import { auth } from "../Firebase";
// import { doc, getFirestore, collection } from "firebase/firestore";
// import app from "../Firebase";
// import { getStorage , ref as storageRef, uploadBytes, getDownloadURL} from "firebase/storage";



// export default function Dashboard() {

//   const [error, setError] = useState("")
//   const { currentUser, logout, setService, getAllUserService } = useAuth()
//   const history = useHistory();
//   const [loading, setLoading] = useState(false);
//   const serviceNameRef = useRef();
//   const serviceDescripitionRef = useRef();
//   const servicePriceRef = useRef();
//   const servicePhoneRef = useRef();
//   const serviceImage = useRef();
//   const [image,setImage] = useState(null);
//   const [progress, setProgress] = useState(0);
//   const [url, setUrl] = useState("");

 



//   const db = getFirestore(app);
//   const serviceCollectionRef = collection(db, "service");


//   // Retrieve Service Documents 
//   // (async (serviceCollectionRef)=>{
//   //   await console.log(getAllUserService(serviceCollectionRef)) 
//   // })(serviceCollectionRef)
//   // const alyDocRef = doc(db, "service", "7755pDJQy3rSZg4pIFEi");

//   function handelChange(e) {
//     if (e.target.files[0]) {
//       setImage(e.target.files[0])
//       console.log(image)
//     }
    
//   }

//   async function handelUpload(){
//     const storage = getStorage(app);
//     const storageReff = storageRef(storage);
//     const imagesRef = storageRef(storageReff,`images/${image.name}`);
//     uploadBytes(imagesRef,image )
//     let result = getDownloadURL(imagesRef).then((downloadURL) => {
//       console.log("File available at", downloadURL);
//       return downloadURL;
//     });
//     return result;
//   }

//   async function handelSubmit(e) {
//     e.preventDefault();
//     try {
//       setError("");
//       setLoading(true);
//       let path = await handelUpload();
//       await setService(serviceCollectionRef, {
//         serviceName: serviceNameRef.current.value,
//         serviceDescripition: serviceDescripitionRef.current.value,
//         servicePrice: servicePriceRef.current.value,
//         servicePhone: servicePhoneRef.current.value,
//         imagePath:path
//       })

//       history.push("/dashboard")
//       console.log('done')
//     } catch (error) {
//       console.log(error);
//       setError("Failed to create an service");
//     }
//     setLoading(false);
//   }

//   async function handleLogout() {
//     setError("");
//     try {
//       await logout(auth)
//       history.push("/login")
//     } catch {
//       setError("Failed to log out")
//     }
//   }



//   return (
//     <>
//       <Container
//         className="d-flex align-items-center justify-content-between"
//         style={{ minHeight: "100vh" }}
//       >
//         <Card className="w-100" style={{ maxWidth: "400px" }}>
//           <Card.Body>

//             <h2 className="text-center mb-4"> Make Service</h2>
//             {error && <Alert variant="danger">{error}</Alert>}

//             <Form onSubmit={handelSubmit}>

//               <Form.Group id="Service_Name">
//                 <Form.Label> Service name </Form.Label>
//                 <Form.Control type="text" ref={serviceNameRef} required />
//               </Form.Group>

//               <Form.Group id="Service_Image">
//                 <Form.Label> Service Image </Form.Label>
//                 <Form.Control type="file" accept=".png, .jpg, .jpeg"  required  onChange={handelChange}/>
//               </Form.Group>
                
//               <Form.Group id="Service_Descripition">
//                 <Form.Label> Service Descripition </Form.Label>
//                 <Form.Control type="text" ref={serviceDescripitionRef} required />
//               </Form.Group>

//               <Form.Group id="Service_Price">
//                 <Form.Label> Service Price</Form.Label>
//                 <Form.Control type="number" ref={servicePriceRef} required />
//               </Form.Group>

//               <Form.Group id="Phone_Number">
//                 <Form.Label> Phone Number </Form.Label>
//                 <Form.Control type="number" ref={servicePhoneRef} required />
//               </Form.Group>

//               <Button type="submit" className="w-100 mt-4">
//                 Submit
//               </Button>

//             </Form>
//           </Card.Body>
//         </Card>
//       </Container>

//       <Card>

//         <Card.Body>
//           <h2 className="text-center mb-4">Profile</h2>
//           {error && <Alert variant="danger"> {error}</Alert>}
//           <strong>Email:</strong>{currentUser ? currentUser.email : ""}
//           <strong>Password:</strong>{currentUser ? currentUser.password : ""}
//           <div>
//             {currentUser.englishUserName}
//           </div>
//           <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
//             Update Profile
//           </Link>
//         </Card.Body>

//       </Card>

//       <div className="w-100 text-center mt-2">
//         <Button variant="link" onClick={handleLogout}> Log Out</Button>
//       </div>

//     </>
//   )
// }
