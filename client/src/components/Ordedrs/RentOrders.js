import React, {useState} from 'react'

export default function RentOrders() {
    const[order,setOrder] = useState([])
    const[user,setUser] = useState([])

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
