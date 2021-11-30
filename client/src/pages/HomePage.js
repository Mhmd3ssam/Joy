import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import Loader from "../components/Loader/Loader";
function HomePage() {
  useEffect(() => {
    document.title = "Home";
  });
  return (
    <Container className="text-center">
      <div className="row text-center mb-4">
        <h2 className="text-primary">
          Please follow our recommendations to help us accomplish your business
        </h2>
      </div>
      {/* Hotels             */}
      <div className="row text-center">
        <div className="col-md-12">
          <h4 className="fw-bold fs-3 my-5 text-left ms-5 mb-3">Hotels</h4>
          <table class="table table-primary">
            <thead>
              <tr>
                <th scope="col">Field name</th>
                <th scope="col">Best Practice</th>
              </tr>
            </thead>
            <tbody>
              <tr class="table-secondary fw-bold">
                <td>Hotel Name</td>
                <td>Your full, real & formal hotel name </td>
              </tr>
              <tr class="table-success fw-bold">
                <td>Room Title</td>
                <td>
                  Room title must be specific & express the main room category
                </td>
              </tr>
              <tr class="table-danger fw-bold">
                <td>Room Features</td>
                <td>
                  Room features must be full, clear and included all details & your hotel address should be included
                </td>
              </tr>
              <tr class="table-warning fw-bold">
                <td>Room Price per night</td>
                <td>Room price must be specific per single night</td>
              </tr>
              <tr class="table-info fw-bold">
                <td>Reservation number</td>
                <td>Please make sure that's the right & available number</td>
              </tr>
              <tr class="table-light fw-bold">
                <td>Available number of rooms</td>
                <td>Clearify the real available number of the same Room</td>
              </tr>
              <tr class="table-dark fw-bold">
                <td>Upload images</td>
                <td>
                  Upload every image hepls you express your service & its unique
                  qualities
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
         {/* Restaurants             */}
         <div className="row text-center">
        <div className="col-md-12">
          <h4 className="fw-bold fs-3 my-5 text-left ms-5 mb-3">Restaurants</h4>
          <table class="table table-primary">
            <thead>
              <tr>
                <th scope="col">Field name</th>
                <th scope="col">Best Practice</th>
              </tr>
            </thead>
            <tbody>
              <tr class="table-secondary fw-bold">
                <td>Restaurant Name</td>
                <td>Your full, real & formal restaurant name </td>
              </tr>
              <tr class="table-success fw-bold">
                <td>Meal Name</td>
                <td>
                Meal Name must be specific & express the main meal ingredients
                </td>
              </tr>
              <tr class="table-danger fw-bold">
                <td>Meal Category</td>
                <td>
                Meal Category should match your meal
                </td>
              </tr>
              <tr class="table-warning fw-bold">
                <td>Meal Details</td>
                <td>your restaurant address should be included here with a detailed description for your meal ingredients</td>
              </tr>
              <tr class="table-info fw-bold">
                <td>Meal Price</td>
                <td>Meal Price should be specific after adding all extra fees</td>
              </tr>
              <tr class="table-light fw-bold">
              <td>Restaurant number</td>
                <td>Please make sure that's the right & available number</td>
              </tr>
              <tr class="table-dark fw-bold">
                <td>Upload images</td>
                <td>
                  Upload every image hepls you express your service & its unique
                  qualities
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
       {/* Rent           */}
       <div className="row text-center">
        <div className="col-md-12">
          <h4 className="fw-bold fs-3 my-5 text-left ms-5 mb-3">Rent</h4>
          <table class="table table-primary">
            <thead>
              <tr>
                <th scope="col">Field name</th>
                <th scope="col">Best Practice</th>
              </tr>
            </thead>
            <tbody>
              <tr class="table-secondary fw-bold">
                <td>Agency or building Name</td>
                <td>Your full, real & formal Agency or building Name name </td>
              </tr>
              <tr class="table-success fw-bold">
                <td>Unit Name</td>
                <td>
                Unit Name must be specific & express the main Unit qualities
                </td>
              </tr>
              <tr class="table-danger fw-bold">
                <td>Unit Details</td>
                <td>your unit address should be included here with a detailed description for your Unit features</td>
              </tr>
              <tr class="table-info fw-bold">
                <td>Unit Price</td>
                <td>Unit price must be specific per single night</td>
              </tr>
              <tr class="table-light fw-bold">
              <td>Reservation number</td>
                <td>Please make sure that's the right & available number</td>
              </tr>
              <tr class="table-warning fw-bold">

              <td>Available number of units</td>
                <td>Clearify the real available number of the same unit</td>
                </tr>

              <tr class="table-dark fw-bold">
                <td>Upload images</td>
                <td>
                  Upload every image hepls you express your service & its unique
                  qualities
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
}

export default HomePage;
