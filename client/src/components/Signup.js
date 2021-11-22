import React, { useRef, useEffect, useState } from "react";
import { Form, Button, Card, Alert ,Container } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { auth } from "../Firebase";
import { Link, useHistory } from "react-router-dom"
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {  MDBInput } from 'mdbreact';

import app from "../Firebase";

export default function Signup() {
  const englishUserName = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const history = useHistory();
  const { signup, currentUser, login, setUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState('');

  async function handelUpload() {
    const storage = getStorage(app);
    const storageReff = storageRef(storage);
    const imagesRef = storageRef(storageReff, `Images/${image.name}`);
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

  function handelChange(e) {
    if (e.target.files[0]) {
      Object.defineProperty(e.target.files[0], 'name', {
        writable: true,
        value: new Date()

      })
      setImage(e.target.files[0])
      console.log(image)
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(auth, emailRef.current.value, passwordRef.current.value)
      await login(auth,emailRef.current.value, passwordRef.current.value)
      await setUser('UserProvider',auth.currentUser.email, {
        englishUserName: englishUserName.current.value,
        userEmail:emailRef.current.value,
        userPassword: passwordRef.current.value,
        userPhone: phoneRef.current.value,
        imagePath:url
      })
      history.push("/layout")

    } catch (err) {
      console.log(err);
      setError("Failed to create an account");
    }
    setLoading(false);
  }
  useEffect(() => {
    document.title = "Sign Up";
  });

  return (
    <>
      <Container
        className="d-flex align-items-center   justify-content-between"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100 text-center">
          <span className="display-1  d-block">Be one of us </span>
          <span className="  ">let's achieve success together</span>
        </div>

          <Card className="w-100" style={{ maxWidth: "400px" }}>
            <Card.Body>
              <h2 className="text-center mb-4"> Sign Up</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="english-userName">
                  <Form.Label> User Name in English</Form.Label>
                  <Form.Control type="text" ref={englishUserName} required />
                </Form.Group>
                <Form.Group id="email">
                  <Form.Label> Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="phone">
                  <Form.Label> Phone number</Form.Label>
                  <Form.Control type="number" ref={phoneRef} required />
                </Form.Group>
                <Form.Group id="User_Image">   
                <label className="text-primary font-weight-bold mb-2">User Image </label>          
                  <MDBInput 
                    type="file"
                    required
                    onChange={handelChange}
                />
                  <Button onClick={handelUpload} className="btn-upload-gradiant mt-5">Upload</Button>
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label> Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="password-confrim">
                  <Form.Label> Password confirmation</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    required
                  />
                </Form.Group>
                <Button disabled={loading} type="submit" className="w-100 mt-4">
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
            <div className="w-100 text-center mt-2">
            Already have an account?  <Link to="/login"> Log In </Link>
          </div>
          </Card>
      </Container>
    </>
  );
}
