import React, {useEffect, useState} from 'react';
import { Container } from "react-bootstrap";
import { useAuth } from '../../context/AuthContext';
import { getFirestore, collection } from "firebase/firestore";
import app from '../../Firebase';



export default function Adman() {
    const {getAllServiceProviders, deleteSingleUser} = useAuth();
    console.log(getAllServiceProviders, deleteSingleUser)
    const db = getFirestore(app);
    const userProviderCollectionRef = collection(db, "UserProvider");
    const[serviceProvider, setServiceProvider] = useState([]);
    const[counter, setCounter] = useState(0);



    function getData() {
        getAllServiceProviders(userProviderCollectionRef).then((res) => {
        setServiceProvider(res);
          console.log(res);
        });
      }

      function deleteUser (id){
        deleteSingleUser("UserProvider", id)
        console.log("deleted")
        setCounter(counter+1)
      }

    useEffect(() => {
        getData();
        document.title = "Admin Panel";
    }, [counter])

    console.log(serviceProvider)


return (
        <Container>
        <h3 className="text-center text-primary mt-5">
            Admin Panel
        </h3>
        <table class="table table-sm table-primary mt-5">
  <thead>
  <tr>
      <th>User Name</th>
      <th scope="col">User Phone</th>
      <th scope="col">User email</th>
      <th scope="col">Free days</th>
      <th scope="col">Status</th>
      <th scope="col">Delete User</th>
    </tr>
</thead>

{/* englishUserName: "Mohamed Essam Ammar"
id: "ammar@gmail.com"
imagePath: "https://firebasestorage.googleapis.com/v0/b/jooy-dadba.appspot.com/o/Images%2FMon%20Nov%2022%202021%2001%3A37%3A58%20GMT%2B0200%20(Eastern%20European%20Standard%20Time)?alt=media&token=242df14a-e2d0-4b56-b7e9-2220de41401b"
userEmail: "ammar@gmail.com"
userPassword: "123456"
userPhone: "0100513555" */}


<tbody>
    {serviceProvider.map((user) => {
    return (
          <tr className="p-5" key={user.userEmail}>
          <td>{user.englishUserName}</td>
          <td>{user.userPhone}</td>
          <td>{user.userEmail}</td>
          <td>{5}</td>
          <td>Status</td>
          <td>  <button
              onClick={() => {
                deleteUser(user.id);
              }}
              type="button"
              class="btn btn-danger btn-sm px-3 mb-2 ms-1 material-tooltip-main"
              data-toggle="tooltip"
              data-placement="top"
              title="Add to wishlist"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" /></svg>

            </button></td>
        </tr>

    )
}
)}

</tbody>
</table>

        </Container>
    )
}
