import React,{useRef,useEffect,useState} from 'react'
import { Form, Button, Card,  Alert } from 'react-bootstrap';
import {useAuth} from '../context/AuthContext'

export default function Signup(){
const emailRef = useRef();
const passwordRef = useRef();
const passwordConfirmRef = useRef();
const firstNameRef = useRef();
const lastNameRef = useRef();
const phoneRef = useRef();
const {signup}=  useAuth();
const [error, setError] = useState("")
const [loading, setLoading] = useState(false)


async  function handleSubmit(e){
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setError("Passwords do not match")
    }
    try {
        setError("")
        setLoading(true)
        await signup(emailRef.current.value, passwordRef.current.value)
    
    } catch {
        setError("Failed to create an account")
    }
    setLoading(false)
}
useEffect(()=>{
    document.title = "Sign Up";

});

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4"> Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="first-name">
                            <Form.Label> First Name</Form.Label>
                            <Form.Control type="text" ref={firstNameRef} required/>
                        </Form.Group>
                        <Form.Group id="last-name">
                            <Form.Label> Last Name</Form.Label>
                            <Form.Control type="text" ref={lastNameRef} required/>
                        </Form.Group>
                        <Form.Group id="email">
                            <Form.Label> Phone Number</Form.Label>
                            <Form.Control type="number" ref={phoneRef} required/>
                        </Form.Group>
                        <Form.Group id="email">
                            <Form.Label> Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label> Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required/>
                        </Form.Group>
                        <Form.Group id="password-confrim">
                            <Form.Label> Password confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required/>
                        </Form.Group>
                        <Button disabled={loading} type="submit" className="w-100 mt-4">Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? Log In
            </div>
        </>
    )
}
