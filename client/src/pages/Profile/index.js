import React, { useState, useEffect } from "react";
import './styles.css'
import { collection, getFirestore } from "@firebase/firestore";
import app from "../../Firebase";
import { useAuth } from "../../context/AuthContext";
import { useHistory, Link } from "react-router-dom";
import { auth } from "../../Firebase";
import Loader from "../../components/Loader/Loader";
import avatarBoy from "../../assets/images/1.png";
import avatarGirl from "../../assets/images/2.png";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';



export default function Profile() {
    const [user, setUser] = useState(null)
    const { getUser, getAllUserService } = useAuth();
    const history = useHistory();

    const [rent, setRent] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [load, setLoad] = useState(true);
    const db = getFirestore(app);
    const restaurantsRef = collection(db, "Restaurants");
    const rentRef = collection(db, "Rent");
    const hotelsRef = collection(db, "Hotels");

    console.log(load)

    useEffect(() => {
        getUser('UserProvider', auth.currentUser.email)
            .then((data) => {
                setUser(data);
        })
        getAllUserService(restaurantsRef).then((res) => {
            setRestaurants(res);
            console.log(res);
        });
        getAllUserService(rentRef).then((res) => {
            setRent(res);
            console.log(res);
        });
        getAllUserService(hotelsRef).then((res) => {
            setHotels(res);
            console.log(res);
            setLoad(false)
        });
        document.title = "Profile"
        console.log(load)

    }, [])
    

    return (
        <>
            {load ?
                <div className="row d-flex justify-content-center align-items-center min-vh-100">
                    <Loader />
                </div>
                : <div class="padding">
                    <div class="col-md-10">
                        <div class="card">
                            <LazyLoadImage class="card-img-top" src="https://i.imgur.com/K7A78We.jpg" alt="User Cover photo" effect="blur"

                              style={{
                                borderTopLeftRadius: ".3rem",
                                borderTopRightRadius: ".3rem",
                                objectFit: "cover"   
                              }} />
                            <div class="card-body little-profile text-center">
                                <div class="pro-img">
                                     <LazyLoadImage placeholderSrc={avatarBoy}  alt="user"
                                      src={user? user.imagePath? user.imagePath : user.gender === "Male"? avatarBoy: avatarGirl : ""} effect="blur" /> 
                                </div>
                                <h3 class="m-b-0">{user ? user.englishUserName : ""}</h3>
                                <p>{user ? user.userEmail : ""}</p>
                                <Link class="m-t-10 waves-effect waves-dark btn btn-primary edit-profile btn-md btn-rounded" data-abc="true" to={`/editeprofile?uerEmail=${user ? user.userEmail : ""}`}>Update your Profile</Link>
                                <div class="row text-center m-t-20">
                                    <div class="col-lg-4 col-md-4 m-t-20">
                                        <h3 class="m-b-0 font-light">{load ? "" : restaurants.length}</h3><small> <Link to="/restaurants">Restaurants</Link></small>
                                        <div><small> <Link to="/restaurantsorders" className="text-danger">Restaurant Orders</Link></small></div>
                                    </div>
                                    <div class="col-lg-4 col-md-4 m-t-20">
                                        <h3 class="m-b-0 font-light">{load ? "" : rent.length}</h3><small> <Link to="/rent">Rent</Link></small>
                                        <div><small> <Link to="/rentorders" className="text-danger"> Rent Orders</Link></small></div>
                                    </div>
                                    <div class="col-lg-4 col-md-4 m-t-20">
                                        <h3 class="m-b-0 font-light">{load ? "" : hotels.length}</h3><small> <Link to="/hotels">Hotels</Link></small>
                                        <div><small> <Link to="/hotelsorders" className="text-danger">Hotels Orders</Link></small></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    )
}
