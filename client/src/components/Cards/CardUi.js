import React, { useState, useEffect } from 'react';
import './card-style.css'
import { useAuth } from '../../context/AuthContext';
import { collection, getFirestore } from '@firebase/firestore';
import app from '../../Firebase';



const ServiceCard = props => {
    const [rent, setRent] = useState([]);
    const[load,setLoad] = useState(true);
    const { getAllUserService } = useAuth();
    const db = getFirestore(app);
    const serviceCollectionRef = collection(db, 'Rent');

    useEffect(() => {
        getAllUserService(serviceCollectionRef)
            .then((res) => {
                setRent(res)
                setLoad(false)
                console.log(res)
            })
    }, [])

    /**
        createdBy: "ana@gmail.com"
        id: "9xECUjDe5cV2uMYn5sHQ"
        imagePath: "https://firebasestorage.googleapis.com/v0/b/jooy-dadba.appspot.com/o/images%2FMon%20Nov%2015%202021%2019%3A41%3A13%20GMT%2B0200%20(Eastern%20European%20Standard%20Time)?alt=media&token=ce7a03eb-8f91-4e8d-aae5-1a14f0b25d7c"
        offerRatio: null
        offerd: false
        serviceDescripition: "hhhhhh"
        serviceName: "hhhh"
        servicePhone: "01012143511"

        {rent ? comp : null}
     */
    console.log(rent)
    let comp = rent.map((res) => {
        const{imagePath,serviceName, servicePhone} = res;
        return(
            <>
                <img src={imagePath}/>
                <h1>{servicePhone}</h1>
                <h3>{serviceName}</h3>
            
            </>
        )

    })
    
    return (
        <>
        <div className="card text-center me-3 ">
            <div className="overflow">
                <img src="https://www.ahstatic.com/photos/1666_ho_00_p_1024x768.jpg" alt="Cataract" className="card-img-top" />
            </div>

            <div className="card-body text-dark">
                <h4 className="card-title">Service Name</h4>
                <p className="card-text text-secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br />
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure <br />
                    dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,<br />
                    sunt in culpa qui officia deserunt mollit anim id est laborum
                </p>
                <a href="#"><button className="btn btn-outline-info">Know more</button></a>
            </div>
        </div>
        {load ? null : comp}

        </>

    )
}

export default ServiceCard;
