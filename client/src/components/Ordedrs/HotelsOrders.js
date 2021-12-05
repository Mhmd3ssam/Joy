import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { collection, getFirestore } from "@firebase/firestore";
import app from "../../Firebase";
import { Container } from "react-bootstrap";

export default function HotelsOrders() {
  const [order, setOrder] = useState([]);
  const [user, setUser] = useState([]);
  const [userDate, setUserData] = useState();
  const [load, setLoad] = useState(true);
  const {
    getAllRestaurantsOrders,
    getUser,
    getAllServiceProviders,
    getAllHotelsOrders,
  } = useAuth();
  const [bq, setBq] = useState([]);
  const [count, setCounter] = useState(0);
  const db = getFirestore(app);
  const serviceCollectionRef = collection(db, "Hotels");

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
  // let arr = [];
  // function getUserData() {
  //   user.map((ele) => {
  //     getUser("Users", ele).then((data) => {
  //       setUserData([{ ...data }]);
  //     });
  //   });
  // }
  console.log(userDate);
  useEffect(() => {
    getData();
  }, []);

  // useEffect(()=>{
  //     if(count !== 0){
  //         getUserData()
  //         //setCounter(count +1)
  //     }
  //     console.log("55")
  // },[count])

  console.log(order);
  console.log(bq);
  console.log(user);
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
                          <td>غرفة بالاس فاخرة مع إطلالة على الحديقة</td>
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
  );
}
