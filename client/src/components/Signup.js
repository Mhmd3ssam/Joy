import React, { useRef, useEffect, useState } from "react";
import { Form, Button, Card, Alert ,Container} from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { auth } from "../Firebase";
import { Link, useHistory } from "react-router-dom"

export default function Signup() {
  const englishUserName = useRef();
  const arabicUserName = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const history = useHistory();
  const { signup, currentUser, login, setUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  
  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(auth, emailRef.current.value, passwordRef.current.value)
      await setUser('UserProvider',englishUserName.current.value, {
        englishUserName: englishUserName.current.value,
        arabicUserName: arabicUserName.current.value,
        userEmail:emailRef.current.value,
        userPassword: passwordRef.current.value,
        userPhone: phoneRef.current.value
      })
      await login(auth,emailRef.current.value, passwordRef.current.value)
      history.push("/dashboard")

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
                <Form.Group id="arabic-userName">
                  <Form.Label> User Name in Arabic</Form.Label>
                  <Form.Control type="text" ref={arabicUserName} required />
                </Form.Group>
                <Form.Group id="phone">
                  <Form.Label> Phone number</Form.Label>
                  <Form.Control type="number" ref={phoneRef} required />
                </Form.Group>
                <Form.Group id="email">
                  <Form.Label> Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
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
