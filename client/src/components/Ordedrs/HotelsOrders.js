import React, {useState, useEffect} from 'react'
import { useAuth } from '../../context/AuthContext'
import { collection, getFirestore,  } from "@firebase/firestore";
import app from '../../Firebase';

export default function HotelsOrders() {
    const[order,setOrder] = useState([])
    const[user,setUser] = useState([])
    const[userDate,setUserData]= useState();
    const[load,setLoad]= useState(true)
    const{getAllRestaurantsOrders, getUser, getAllServiceProviders, getAllHotelsOrders} = useAuth()
    const[bq, setBq] = useState([])
    const[count,setCounter]= useState(0)
    const db = getFirestore(app);
    const serviceCollectionRef = collection(db, "Hotels");

    function getData(){
        getAllHotelsOrders(serviceCollectionRef)
        .then((data)=>{
            data.map((doc)=>{
                doc.usersID.map((ele)=>{
                    setUser((prev)=>[...prev,ele])
                    console.log(user)
                    setCounter(count + 1)
                    setLoad(false)
                })
            })    
        })   
    }
    let arr = []
    function getUserData(){
        user.map((ele)=>{
            getUser("Users", ele)
            .then((data)=>{
                setUserData([{...data}])

            })
        })
    }
console.log(userDate)
    useEffect(()=>{
        getData()
    },[])

    useEffect(()=>{
        if(count !== 0){
            getUserData()
            //setCounter(count +1)
        }
        console.log("55")
    },[count])
  
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
