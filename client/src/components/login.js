import React, { useRef, useEffect, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../Firebase";
import LoginImage from "../pages/CreateService/images/login.jpeg"
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
      if (emailRef.current.value === "adman@joy.com") {
        await login(auth, emailRef.current.value, passwordRef.current.value);
        history.push("/adman");
      } else {
        await login(auth, emailRef.current.value, passwordRef.current.value);
        history.push("/layout");
      }
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }
  const showPass = ()=>{
    return(
      <button>
        h
      </button>
    )
  }
  return (
    <>
      <Container className="mt-5">
        <section className="h-100 h-custom">
          <div className="container  h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-8 ">
                <div className="card rounded-3">
                  <img
                    src={LoginImage}
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
                  {error && <Alert variant="danger" className="mt-4">{error}</Alert>}
                  <div className="card-body  ">
                    <h3 className="mb-4 pb-2 pb-md-0  px-md-2 text-center text-primary">
                      Welcom Back
                    </h3>
                    <form className="px-md-2" onSubmit={handleSubmit}>
                      <div className=" mb-4">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="User Email"
                          type="email"
                          ref={emailRef}
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          type="password"
                          className="form-control "
                          placeholder="User Password"
                          ref={passwordRef}
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary w-100 btn-lg mb-1 mt-4"
                      >
                        login
                      </button>
                    </form>
                    <div className="w-100 text-center mt-3">
                      <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                    <div className="w-100 text-center mt-2">
                      Need an account? <Link to="/signup"> Sign Up </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
