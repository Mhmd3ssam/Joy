import React, { useRef, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { auth } from "../Firebase";
import { Link, useHistory,useLocation } from "react-router-dom";
import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import RegisterImage from "../pages/CreateService/images/register.jpeg";
import app from "../Firebase";

export default function Signup() {
  const { signup, currentUser, login, setUser } = useAuth();
  const { search } = useLocation();
  let plane = search.split('=')[1];

  const englishUserName = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [userGender,setuserGender] = useState('');
  const[valdation,setValdation] =useState({
    userName:"",
    userEmail:"",
    userPhone:"",
    userPassword:""
  })
  console.log(userGender)

  const history = useHistory();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");

  const [imgErr, setImgErr] = useState("");
  const [signError, setSignError] = useState({email:"", userName:"",phone:"", password:""});
  const[phone, setPhone] = useState("")

  //ٌRegex
  const emailValidation =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  const userNameValidation =
  /[a-zA-Z]{2,10}[^&*%$#@!|~`'"){+->?]+\s[a-zA-Z]{2,10}[^&*%$#@!|~`'"){+->?]$/;

    const password =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


  
  function errorSubmitState(e){

  //mobile validation
  //type'blur'
    if(e.type=="blur"){
      if(e.target.name === "email" ){
        setSignError({...signError,email:!emailValidation.test(e.target.value)? "you should provide an email" : null,})
      }else if(e.target.name === "userName"){
        setSignError({...signError,userName:!userNameValidation.test(e.target.value)? "User name should be two words and each word have at least 3 char like Ali Ali" : null,})
      }else if(e.target.name === "phoneNumber"){
        setSignError({...signError,phone: e.target.value.length !== 11? "Phone Number must be 11 Number" : null,})
      }else if(e.target.name === "password"){
        setSignError({...signError, password:!password.test(e.target.value)? "The Password should contain at least one lowercase, one uppercase, at least one digit, & special character [*@%$# ] and mustn't have any white spaces." : null})
      }
    }
    else{
        setSignError({
      ...signError,
      email:
       !emailValidation.test(e.target[0].value)? "you should provide an email" : null,
      userName:
       !userNameValidation.test(e.target[1].value)? "User name should be two words and each word have at least 3 char like Ali Ali" : null,
      phone: 
      e.target[2].value.length !== 11? "Phone Number must be 11 Number" : null,
       password:
       !password.test(e.target[3].value)? 
       "The Password should contain at least one lowercase, one uppercase, at least one digit, & special character [*@%$# ] and mustn't have any white spaces." : null
            
    })
    }
    console.log(e.type)
  ;
  }

  async function handelUpload() {
    console.log("test")
    try{
    const storage = getStorage(app);
    const storageReff = storageRef(storage);
    const imagesRef = storageRef(storageReff, `Images/${image.name}`);
    const uploadTask = uploadBytesResumable(imagesRef, image);
    console.log(uploadTask);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (imgErr) => console.log(imgErr),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setUrl(downloadURL);
        });
      }
    );
    }catch (error) {
      console.log(error.message);
      setImgErr("Upload Image First");
    }
  }
  

  function handelChange(e) {
    setProgress(0);
    if (e.target.files[0]) {
      Object.defineProperty(e.target.files[0], "name", {
        writable: true,
        value: new Date(),
      });
      setImage(e.target.files[0]);
      console.log(image);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    let mobileCode= phoneRef.current.value.substring(0,3);
    let validMobileCode =
    mobileCode == "010" ||
    mobileCode == "011" ||
    mobileCode == "012" ||
    mobileCode == "015"
      ? true
      : false;
    setPhone(phoneRef)
    console.log(phoneRef)
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords doesn't match");
    }
    try {
    
      setError("");
      if (!userNameValidation.test(englishUserName.current.value) || !emailValidation.test(emailRef.current.value)
           || !password.test(passwordRef.current.value) || phoneRef.current.value.length !== 11 || !validMobileCode
        ){
        throw "User name must start with letters a-z"
      }
      setLoading(true);
      await signup(auth, emailRef.current.value, passwordRef.current.value);
      await login(auth, emailRef.current.value, passwordRef.current.value);
      await setUser("UserProvider", auth.currentUser.email, {
        englishUserName: englishUserName.current.value,
        userEmail: emailRef.current.value,
        userPassword: passwordRef.current.value,
        userPhone: phoneRef.current.value,
        imagePath: url,
        gender:userGender,
        plane:"for testing"
      });
      history.push("/layout");
    } catch (err) {
      console.log(err);
      setError(err);
      errorSubmitState(e)
    }
    setLoading(false);
  }
  useEffect(() => {
    document.title = "Sign Up";
  });

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
      <Container className="mt-1">
        <section className="h-100 h-custom">
          <div className="container  h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-8 ">
                <div className="card rounded-3">
                  <img
                    src={RegisterImage}
                    className="w-100"
                    style={{
                      borderTopLeftRadius: ".3rem",
                      borderTopRightRadius: ".3rem",
                      height: "261px",
                      objectFit: "cover",
                    }}
                    alt="Register"
                  />

                  <div className="card-body  ">
                    <h3 className="mb-4 pb-2 pb-md-0  px-md-2 text-center text-primary">
                      Create an account
                    </h3>
                    {/* {error && <Alert variant="danger">{error}</Alert>} */}
                    <form className="px-md-2" onSubmit={handleSubmit}>
                      <div className=" mb-4">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email Address"
                          ref={emailRef} 
                          name="email"
                          value={valdation.userEmail}
                          onChange={(e)=>setValdation({...valdation,userEmail:e.target.value})}
                          onBlur={(e)=>{errorSubmitState(e)}}
                        />
                        {signError.email? <small className="text-danger ms-1">
                          {signError.email}
                        </small>: null }
                      </div>
                      <div className="mb-4">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="User Name"
                          name="userName"
                          ref={englishUserName}
                          value={valdation.userName}
                          onChange={(e)=>setValdation({...valdation,userName:e.target.value})}
                          onBlur={(e)=>{errorSubmitState(e)}}
                        />
                      {signError.userName? <small className="text-danger ms-1">
                          {signError.userName}
                        </small>: null }
                      </div>
                      <div className="row">
                        <div className="col-md-12 mb-4">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Phone Number"
                            name="phoneNumber"
                            ref={phoneRef}
                            value={valdation.userPhone}
                            onChange={(e)=>setValdation({...valdation,userPhone:e.target.value})}
                            onBlur={(e)=>{errorSubmitState(e)}}
                          />
                          {signError.phone? <small className="text-danger ms-1">
                          {signError.phone}
                        </small>: null }
                        </div>
                        
                      </div>

                      <div class="form-check form-check-inline mb-4">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="gender"
                          id="male"
                          value='Male'
                          onChange={(e)=>{setuserGender(e.target.value)}}
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
                          onChange={(e)=>{setuserGender(e.target.value)}}
                        />
                        <label class="form-check-label" for="female">
                          female
                        </label>
                      </div>

                      <div className="row">
                        <div className="col-md-12 mb-4">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            name="password"
                            ref={passwordRef}
                            value={valdation.userPassword}
                            onChange={(e)=>setValdation({...valdation,userPassword:e.target.value})}
                            onBlur={(e)=>{errorSubmitState(e)}}
                          />
                          {signError.password? <small className="text-danger ms-1">
                          {signError.password}
                        </small>: null }
                        </div>
                        
                      </div>

                      <div className="row">
                        <div className="col-md-12 mb-4">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm Password"
                            name="confirm"
                            ref={passwordConfirmRef}
                          />
                        </div>
                        {/* {errors.servicePrice ? (
                          <small className="text-danger ms-1">
                            {errors.servicePrice}
                          </small>
                        ) : null} */}
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
                      <span className="text-danger">{imgErr}</span>
                      {progress === 0 ? null : progress > 0 && progress < 100 ? (
                      progressComp()
                    ) : progress === 100 ? (
                      <>
                        Image Uploaded{" "}
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
                        Sign Up
                      </button>
                    </form>
                    <div className="w-100 text-center mt-2">
                      Already have an account?
                      <Link to="/login" className="text-primary">
                        Log In
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
  );
}
