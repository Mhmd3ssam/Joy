import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Signup from "./Signup";
import { AuthProvider } from "../context/AuthContext"
function App() {
 
  return (
    <AuthProvider> 
    <Container
      className="
    d-flex 
    align-items-center 
    justify-content-between"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100 text-center">
        <span className="display-1  d-block">Be on of us </span>
        <span className="  ">let's achieve success together</span>
      </div>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Signup />
      </div>
    </Container>
    </AuthProvider> 
  );
}

export default App;
