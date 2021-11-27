import React, {useState} from 'react'

export default function RentOrders() {
    const[order,setOrder] = useState([])
    let comp = ()=>{
        return(
            <div>
            JJ
            </div>
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
