import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../Firebase";
import {  MDBInput } from 'mdbreact';
import {BrowserRouter as Router,Link,useLocation , useHistory} from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { auth } from "../../Firebase";
export default function EditeItem() {
  //our state
    const [error, setError] = useState("");
    const [load, setLoad] = useState(true);
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const history = useHistory();

    const { search } = useLocation();
    const {  editeUserData, getSingleService, updatedEmail } = useAuth();

    const[userImage,setUserImage] = useState("");
    const[userName,setUserName] = useState("");
    const[userPhone,setUserPhone] = useState("");
    const[email,setEmail] = useState("");
    const[password,setUsrPassword] = useState("");
  
    console.log(editeUserData)

    let userEmail = search.split('=')[1];
    console.log(userEmail)

    //our functions 
    function editeService() {
      console.log("ggg");
      //updatedEmail(auth,email)
      editeUserData("UserProvider", userEmail, {
        englishUserName: userName,
        userEmail: email,
        imagePath: userImage,
        userPhone:userPhone,
        userPassword:password
      });
      history.push("/profile")
    }

    function getData(){
      getSingleService("UserProvider", userEmail)
      .then((data)=>{
        console.log(data)
        const{imagePath,englishUserName,userPhone,userEmail, userPassword}= data;
        setUserImage(imagePath)
        setUserPhone(userPhone)
        setUserName(englishUserName)
        setEmail(userEmail)
        setUsrPassword(userPassword)
      })
    }
    /*
    englishUserName: "Mohamed "
    imagePath: "https://firebasestorage.googleapis.com/v0/b/jooy-dadba.appspot.com/o/images%2FThu%20Nov%2018%202021%2022%3A51%3A25%20GMT%2B0200%20(Eastern%20European%20Standard%20Time)?alt=media&token=c65d3324-72e3-4d65-ba7f-1e4a8719102c"
    userEmail: "mohamed@gmail.com"
    userPhone: "01012143511"
    
    */

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
          setUserImage(downloadURL)
        });
      }
    )
  }
    useEffect(()=>{
      getData()
      setLoad(false)
    },[])
 
  console.log(userName)
  console.log(userPhone)
  console.log(password)
  console.log(email)

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
                    User Name
                  </Form.Label>
                  <Form.Control
                    validate
                    labelClass="white-text"
                    type="text"
                    required
                    placeholder="Enter Your Service Name"
                    value={userName}
                    onChange={(e)=>{setUserName(e.target.value)}}
                  />
                  </Form.Group>
                      <Form.Group id="Phone_Number">
                        <Form.Label className="text-primary font-weight-bold">
                          Phone Number
                        </Form.Label>
                        <Form.Control
                        type="number" 
                        value={userPhone}
                        onChange={(e)=>{setUserPhone(e.target.value)}}
                        required 
                        placeholder="Enter Your Phone Number"/>
                      </Form.Group>
                      <Form.Group id="Service_Image">
                        <label className="text-primary font-weight-bold mb-2">UserImage </label>
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
