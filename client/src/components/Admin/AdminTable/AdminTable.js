import React, { useEffect, useState } from "react";
import "./admintable.css";
import { useAuth } from "../../../context/AuthContext";
import { getFirestore, collection } from "firebase/firestore";
import app, { auth } from "../../../Firebase";
import { doc, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

function AdminTable() {
  const { getAllServiceProviders, deleteSingleUser, getUser } = useAuth();
  console.log(getAllServiceProviders, deleteSingleUser);
  const db = getFirestore(app);
  const userProviderCollectionRef = collection(db, "UserProvider");
  const [serviceProvider, setServiceProvider] = useState([]);
  const[userData,setuserData] = useState([])
  const [counter, setCounter] = useState(0);
  const [todayDate, setTodayDate] = useState(new Date().getDate());
  serviceProvider.map((user) => {
    user.prem = 10;
    user.pending = 20;
  });
  console.log(userData)

  function getData() {
    getAllServiceProviders(userProviderCollectionRef).then((res) => {
      setServiceProvider(res);
      console.log(res);
      // countFreedays()
    });
  }

  function deleteUser(user) {
    //deleteSingleUser("UserProvider", id);
    editeUser("UserProvider", user.userEmail, !user.displayServ)
    console.log("deleted");
    setCounter(counter + 1);
  }

  function countFreedays(user) {
    let creationDay = user.createdAt.seconds;
    let creation = new Date(creationDay * 1000);
    let creationDate = creation.getDate();
    console.log(creationDate);
    // console.log(expireDateInSeconds)
    // let expireDate = new Date(expireDateInSeconds * 1000)
    // console.log(expireDate)
    if (todayDate === creationDate) {
      user.prem = 10;
      user.pending = user.prem + 10;
    } else if (todayDate - creationDate === 10) {
      user.prem = 0;
      user.pending = user.prem + 10;
    } else if (todayDate - creationDate > 0 && todayDate - creationDate < 10) {
      user.prem = 10 - (todayDate - creationDate);
      user.pending = user.prem + 10;
    }
    return [creationDay, creation, user.prem, user.pending];
  }
  function paid(user) {
    user.paid = true;
    editeUserData("UserProvider", user.userEmail, { paid });
    setCounter(counter + 1);
  }

  async function editeUserData(collectionName, userEmailId, { paid }) {
    const alyDocRef = doc(db, collectionName, userEmailId);
    await updateDoc(alyDocRef, {
      paid: true,
    });
  }
  async function editeUser(collectionName, userEmailId, bool) {
    const alyDocRef = doc(db, collectionName, userEmailId);
    await updateDoc(alyDocRef, {
      displayServ: bool,
    });
  }

  useEffect(() => {
    getData();
    document.title = "Admin Panel";
    getUser("Adamans",auth.currentUser.email)
    .then((data)=>{
      setuserData(data)
    })

  }, [counter]);

  console.log(serviceProvider);
  console.log(todayDate);

  return (
    <div>
      <div class="container-fluid">
          <h1 className="mb-3 text-warning">Joy Admin Panel</h1>
          <h5 className="mb-3">Current Adman : {userData.englishUserName}</h5>
        <div class="row">
          <div class="col-md-12">
            <div class="panel">
              <div class="panel-heading">
                <div class="row">
                  <div class="col-md-8 col-sm-3 col-xs-12">
                    <h4 class="title text-start">
                      Service Providers <span>List</span>
                    </h4>
                  </div>
                  <div class="col-md-4 col-sm-9 col-xs-12 text-right">
                    <div class="btn_group">
                      <Link to="/admanregister">
                        <button className="btn btn-info me-5">
                          Make Admin
                        </button>
                      </Link>
                      {/* <button class="btn btn-default" title="Excel"> */}
                      <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="download-table-xls-button btn btn-default"
                        table="table-to-xls"
                        filename="tablexls"
                        sheet="tablexls"
                        buttonText={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            class="bi bi-file-earmark-excel"
                            viewBox="0 0 16 16"
                          >
                            <path d="M5.884 6.68a.5.5 0 1 0-.768.64L7.349 10l-2.233 2.68a.5.5 0 0 0 .768.64L8 10.781l2.116 2.54a.5.5 0 0 0 .768-.641L8.651 10l2.233-2.68a.5.5 0 0 0-.768-.64L8 9.219l-2.116-2.54z" />
                            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                          </svg>
                        }
                      />

                      {/* </button> */}
                    </div>
                  </div>
                </div>
              </div>
              <div class="panel-body table-responsive">
                <table class="table" id="table-to-xls">
                  <thead>
                    <tr className="text-center">
                      <th>User Name</th>
                      <th scope="col">User Phone</th>
                      <th scope="col">User email</th>
                      <th scope="col">Creation date</th>
                      <th scope="col">Renewing date</th>
                      <th scope="col">Subcription Plan</th>
                      <th scope="col">Available free days</th>
                      <th scope="col">Pending days</th>
                      <th scope="col">Paid Status</th>
                      <th scope="col">Payment button</th>
                      <th scope="col">Subcription Plan</th>
                      <th scope="col">Delete User</th>
                    </tr>
                  </thead>
                  <tbody>
                    {serviceProvider.map((user) => {
                      const [creationDay, creation, prem, pending] =
                        countFreedays(user);
                      let renewingDate = creation.setMonth(
                        creation.getMonth() + 3
                      );
                      let date = new Date(creationDay * 1000);
                      //let RR = new Date (renewingDate*1000)
                      let paidClass;
                      return (
                        <tr className="p-5" key={user.userEmail}>
                          <td>{user.englishUserName}</td>
                          <td>{user.userPhone}</td>
                          <td>{user.userEmail}</td>
                          <td>{date.toString().split("GMT")[0]}</td>
                          <td>{creation.toString().split("GMT")[0]}</td>
                          <td>{5}</td>
                          <td>{prem}</td>
                          <td>{pending}</td>
                          <td>
                            {user.paid === true ? (
                              <span class="badge bg-success text-light">
                                Success
                              </span>
                            ) : pending > 13 && pending <= 20 ? (
                              <span class="badge bg-info text-dark">
                                Waiting
                              </span>
                            ) : pending > 10 && pending < 14 ? (
                              <span class="badge bg-warning text-dark">
                                Calling
                              </span>
                            ) : pending === 0 ? (
                              <span class="badge bg-danger">Expired</span>
                            ) : null}
                          </td>
                          <td>
                            <button
                              disabled={user.paid}
                              onClick={() => {
                                paid(user);
                              }}
                              type="button"
                              className={`badge bg-${
                                user.paid ? "success" : "primary"
                              } btn-sm`}
                            >
                              {user.paid ? "Paid" : "pay now"}
                            </button>
                          </td>
                          <td>{user.plane}</td>
                          <td>
                            <button
                              onClick={() => {
                                deleteUser(user);
                              }}
                              type="button"
                              class="btn btn-danger btn-sm px-3 mb-2 ms-1 material-tooltip-main"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Add to wishlist"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-trash-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminTable;
