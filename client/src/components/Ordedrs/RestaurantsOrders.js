import React, {useState , useEffect} from 'react'
import { useAuth } from '../../context/AuthContext'
import { collection, getFirestore,  } from "@firebase/firestore";
import app from '../../Firebase';

export default function RestaurantsOrders() {
    const[order,setOrder] = useState([])
    const[user,setUser] = useState([])
    const{getAllRestaurantsOrders, getUser, getAllServiceProviders, getAllHotelsOrders} = useAuth()
    const[bq, setBq] = useState([])
    const db = getFirestore(app);
    const serviceCollectionRef = collection(db, "Restaurants");

    function getData(){
      getAllRestaurantsOrders(serviceCollectionRef)
        .then((data)=>{
            setOrder(data)
            data.map((obj)=>{
                
                
            })
           
        })
        
    }
    function users(serialNum){
        getUser("Users",serialNum)
            .then((data)=>{
                setUser(data)
            })
    }
    useEffect(()=>{
        getData()
        // const[userData]= bq
        // const{ serialNum} = userData
        // for(let i =0 ; i < bq.length ; i++){
        //     users(serialNum)
        // }
    },[])
    useEffect(()=>{
       
       
    },[])
    console.log(order)
    console.log(bq)
    console.log(user)
    let comp = ()=>{
        
        return(
           <>
           {user ?
           <table class="table table-bordered">
           <thead>
             <tr className="text-center">
               <th scope="col">#</th>
               <th scope="col">Client Name</th>
               <th scope="col">Client Phone</th>
               <th scope="col">Client Service</th>
               <th scope="col">Client Barcode</th>
             </tr>
           </thead>
           <tbody>
             <tr>
               <th scope="row">1</th>
               <td>{user.name}</td>
               <td></td>
               <td>@mdo</td>
             </tr>
             <tr>
               <th scope="row">2</th>
               <td>Jacob</td>
               <td>Thornton</td>
               <td>@fat</td>
             </tr>
             <tr>
               <th scope="row">3</th>
               <td colspan="2">Larry the Bird</td>
               <td>@twitter</td>
             </tr>
           </tbody>
         </table>
           
           : "false"}
           </>
        )
    }
    return (
        <>
        {order.length === 0 ?  
        <h4 className="row d-flex justify-content-center align-items-center min-vh-100 text-center bosition">
            You don't have any orders yet !!
          </h4>:comp()}
       
        </>
    )
}
