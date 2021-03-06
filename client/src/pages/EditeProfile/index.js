import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../Firebase";
import {  MDBInput } from 'mdbreact';
import {BrowserRouter as Router,Link,useLocation , useHistory} from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { auth } from "../../Firebase";
import updateProfile from "../CreateService/images/updateProfile.jpeg";
import Loader from "../../components/Loader/Loader";
export default function EditeItem() {
  //our state
    const [error, setError] = useState("");
    const [load, setLoad] = useState(true);
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const history = useHistory();

    const { search } = useLocation();
    const {  editeUserData, getSingleService, updatedEmail,  getUser} = useAuth();

    const[userImage,setUserImage] = useState("");
    const[userName,setUserName] = useState("");
    const[userPhone,setUserPhone] = useState("");
    const[email,setEmail] = useState("");
    const[password,setUsrPassword] = useState("");
    const[userGender,setUserGender] = useState("")
    console.log(auth.currentUser.email)
  //Error object to Validate inputs
  const [updateError, setUpdateError] = useState({userName:"",phone:""});


  //ٌRegex  
  const userNameValidation =
  /[a-zA-Z]{2,10}[^&*%$#@!|~`'"){+->?]+\s[a-zA-Z]{2,10}[^&*%$#@!|~`'"){+->?]$/;


  //validate mobile code
  let mobileCode = userPhone.substring(0, 3);
  console.log(mobileCode);
  let validMobileCode =
    mobileCode == "010" ||
    mobileCode == "011" ||
    mobileCode == "012" ||
    mobileCode == "015"
      ? true
      : false;
  console.log(validMobileCode);  

    console.log(editeUserData)

    let userEmail = search.split('=')[1];
    console.log(userEmail)

    //our functions 
    function editeService(e) {
      e.preventDefault()
      try{
      console.log("ggg");
      //updatedEmail(auth,email)
      if(userName === ""
      ||!userNameValidation
      || userPhone === ""
      || userPhone.length !== 11
      ||validMobileCode === false
      ){
        throw "error"
      }
      editeUserData("UserProvider", userEmail, {
        englishUserName: userName,
        userEmail: email,
        imagePath: userImage,
        userPhone:userPhone,
        userPassword:password,
        gender:userGender
      });
      history.push("/profile")
    } catch(err){
      console.log(err)
      errorSubmitState(e)
    }
    }

    function getData(){
      getUser("UserProvider",auth.currentUser.email)
      .then((data)=>{
        console.log(data)
        //const{imagePath,englishUserName,userPhone,userEmail, userPassword, gender}= data;
        // setUserImage(imagePath)
        // setUserPhone(userPhone)
        // setUserName(englishUserName)
        // setEmail(userEmail)
        // setUsrPassword(userPassword)
        // setUserGender(gender)
        
      })
    }
   

    function handelChange(e) {
      setProgress(0);
      if (e.target.files[0]) {
        Object.defineProperty(e.target.files[0], 'name', {
          writable: true,
          value: new Date()
        })
        setImage(e.target.files[0])
      }
    }

    
  async function handelUpload(e) {
    e.preventDefault();
    try{
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
  }catch(err){
    setError("Upload Image First");
  }

}

 //function to validate inputs onBlur & onSubmit
 function errorSubmitState(e){

  //mobile validation
  //type'blur'
    if(e.type=="blur"){
       if(e.target.name === "userName"){
        setUpdateError({...updateError,userName:e.target.value.length === 0 ? "User name is required" :
        !userNameValidation.test(e.target.value)? "User name should be two words and each word have at least 3 char like Ali Ali" : null,})
      }else if(e.target.name === "phoneNumber"){
        setUpdateError({...updateError,phone: e.target.value.length === 0 ? "Phone number is required" :
           e.target.value.length !== 11? "Phone Number must be 11 Number" :!validMobileCode
           ? "Phone Number must start with a valid code": null})
      }
    }
    else{
      setUpdateError({
      ...updateError,
      userName:
      e.target[0].value.length === 0 ? "User name is required" :
       !userNameValidation.test(e.target[0].value)? "User name should be two words and each word have at least 3 char like Ali Ali" : null,
      phone: 
      e.target[1].value.length === 0
      ? "Phone Number is required" :
      e.target[1].value.length !== 11? "Phone Number must be 11 Number" : 
      !validMobileCode
            ? "Phone Number must start with a valid code"
            : null,
            
    })
    }
    console.log(e.type)
  ;
  }
      getData()

    useEffect(()=>{
     // getData()
      setLoad(false)
    },[])
 
  console.log(userName)
  console.log(userPhone)
  console.log(password)
  console.log(email)

  let progressComp = () => {
    return (
      <div class="progress">
        <div
          class="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  };

    return ( 
      <>
      {load ?  <div className="row d-flex justify-content-center align-items-center min-vh-100">
          <Loader />
        </div>:
        <Container className="mt-1">
        <section className="h-100 h-custom">
          <div className="container  h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-8 ">
                <div className="card rounded-3">
                   <img
                    src={updateProfile}
                    className="w-100"
                    style={{
                      borderTopLeftRadius: ".3rem",
                      borderTopRightRadius: ".3rem",
                      width: "709px",
                      height: "261px",
                      objectFit: "cover"   
                    }}
                    alt="Sample photo"
                  />
                
                  <div className="card-body  ">
                    <h3 className="mb-4 pb-2 pb-md-0  px-md-2 text-center text-primary">
                    Update Your information
                    </h3>
                    <form className="px-md-2" onSubmit={editeService}>
                      <div className=" mb-4">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Edit your User Name"
                          onChange={(e)=>{setUserName(e.target.value)}}
                          value={userName}
                          name="userName"
                          onBlur={(e) => {errorSubmitState(e)}}
                        />
                        {updateError.userName ? (
                          <small className="text-danger ms-1">
                            {updateError.userName}
                          </small>
                        ) : null}
                      </div>
  
                      <div className="mb-4">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Edit your phone number"
                          value={userPhone}
                          onChange={(e)=>{setUserPhone(e.target.value)}}
                          name="phoneNumber"
                          onBlur={(e) => {errorSubmitState(e)}}
                        />
                        {updateError.phone ? (
                          <small className="text-danger ms-1">
                            {updateError.phone}
                          </small>
                        ) : null}
                      </div>
  
                      <div class="form-check form-check-inline mb-4">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="gender"
                            id="male"
                            value='Male'
                            onChange={(e)=>{setUserGender(e.target.value)}}
                            checked={userGender === "Male"? true: false}
                          />
                          <label class="form-check-label" for="male">
                            male
                          </label>
                        </div>
                        <div class="form-check form-check-inline mb-4">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="gender"
                            id="female"
                            value="female"
                            onChange={(e)=>{setUserGender(e.target.value)}}
                            checked={userGender === "female"? true: false}

                          />
                          <label class="form-check-label" for="female">
                            female
                          </label>
                        </div>
                      <div class="input-group mb-3">
                        <input
                          type="file"
                          class="form-control"
                          name="image"
                          placeholder="Upload Image"
                          onChange={handelChange}
                          
                        />
                        <button
                          className="btn btn-primary "
                          onClick={handelUpload}
                          disabled={progress === 100 ? true : false}
                          type="button"
                        >
                          {progress === 100 ? "Uploaded" : "Upload"}
                        </button>
                      </div>
                      <span className="text-danger">{error}</span>
                      {progress === 0 ? null : progress > 0 && progress < 100 ? (
                        progressComp()
                      ) : progress === 100 ? (
                        <>
                          Image Uploaded
                          <img
                            src="https://img.icons8.com/nolan/96/photoshoot-completed.png"
                            width="20"
                          />
                        </>
                      ) : null}
                      <button
                        type="submit"
                        className="btn btn-primary w-100 btn-lg mb-1 mt-4"
                      >
                        Save changes
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>  
    }
        
      </>
  
    )
}
