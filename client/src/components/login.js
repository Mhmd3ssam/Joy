import React, { useRef, useEffect, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../Firebase";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      if(emailRef.current.value === "adman@joy.com"){
        await login(auth, emailRef.current.value, passwordRef.current.value);
        history.push("/adman");
      }else{
        await login(auth, emailRef.current.value, passwordRef.current.value);
        history.push("/layout");
      }
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }

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
            <h2 className="text-center mb-4"> log In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label> Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label> Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button disabled={loading} type="submit" className="w-100 mt-4">
                Log In
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </Card.Body>
          <div className="w-100 text-center mt-2">
            Need an account? <Link to="/signup"> Sign Up </Link>
          </div>
        </Card>
      </Container>
    </>
  );
}
