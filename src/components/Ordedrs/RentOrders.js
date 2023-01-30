import React, {useState, useEffect} from 'react';
import { useAuth } from "../../context/AuthContext";
import { collection, getFirestore } from "@firebase/firestore";
import app from "../../Firebase";
import { Container } from "react-bootstrap";


export default function RentOrders() {
    const[order,setOrder] = useState([])
    const[user,setUser] = useState([])

    const {
      getAllHotelsOrders,
    } = useAuth();
    const db = getFirestore(app);

    const serviceCollectionRef = collection(db, "Rent");

    function getData() {
      getAllHotelsOrders(serviceCollectionRef).then((data) => {
        data.map((doc) => {
          doc.usersID.map((ele) => {
            setUser((prev) => [...prev, ele]);
            console.log(user);
          });
        });
      });
    }

    useEffect(() => {
      getData();
    }, []);

    let comp = () => {
      return (
        <Container>
          <div className="row">
            <div className="col-md-12">
              <table class="table table-bordered">
                <thead>
                  <tr className="text-center">
                    <th scope="col">#</th>
                    <th scope="col">User Name</th>
                    <th scope="col">User Phone</th>
                    <th scope="col">Service Name</th>
                  </tr>
                </thead>
                <tbody>
                  {user.length !== 0
                    ? user.map((cus, i) => {
                        let userName = cus.split("=")[0];
                        console.log(userName);
  
                        let userPhone = cus.split("=")[1];
  
                        return (
                          <tr className="text-center">
                            <th scope="row">{i + 1}</th>
                            <td>{userName}</td>
                            <td>{userPhone}</td>
                            <td>@mdo</td>
                          </tr>
                        );
                      })
                    : "false"}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      );
    };
    return (
      <Container>
      <div className="row">
        <div className="col-12">
          {user.length === 0 ? (
            <h4 className="row d-flex justify-content-center align-items-center min-vh-100 text-center bosition">
              You don't have any orders yet !!
            </h4>
          ) : (
            comp()
          )}
        </div>
      </div>
    </Container>
    )
}
