import React, { useState, useEffect } from 'react';
import './card-style.css'
import { useAuth } from '../../context/AuthContext';
import { collection, getFirestore , doc, deleteDoc} from '@firebase/firestore';
import app from '../../Firebase';
import { Container } from 'react-bootstrap';





const RentService = () => {

    const [rent, setRent] = useState([]);
    const [load, setLoad] = useState(true);
    const { getAllUserService ,  } = useAuth();
    const db = getFirestore(app);
    const serviceCollectionRef = collection(db, 'Rent');
   
    async function deletService(documentId){
        console.log(documentId)
        const alyDocRef = doc(db, 'Rent', documentId);
        await deleteDoc(alyDocRef);
    }


    useEffect(() => {
        getAllUserService(serviceCollectionRef)
            .then((res) => {
                setRent(res)
                setLoad(false)
                console.log(res)
            })}
    ,[])
    


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
        const { imagePath, serviceName, servicePhone, offerd , offerRatio , id , createdBy, serviceDescripition} = res;
        console.log(id)
        return (
            <Container>
                <div className="row">
                <div className="col-md-12">

                <div className="card text-center me-3 " key={id}>
                    <div className="overflow">
                        <img src={imagePath} alt="Cataract" className="card-img-top" />
                    </div>
                    <div className="card-body text-dark">
                        <h4 className="card-title">{serviceName}</h4>
                        <p className="card-text text-secondary">
                           {serviceDescripition}
                        </p>
                    <button className="btn btn-outline-info" onClick={()=>{deletService(id)}}>Delete item</button>
                    </div>
                </div>
                </div>
                </div>

            </Container>
        )

    })

    return (
        <>
            {load?<h1>Loading...</h1> :(rent.length==0)?<h1>you don't have any services yet</h1>: comp}
        </>
    )
}

export default RentService;
