import React from "react";
import AdminTable from "./AdminTable/AdminTable";

export default function Adman() {
  return (
    <>
      <div className="container-fluid  text-center">
        <div className="row text-center m-5">
          <div className="col-md-12 ">
            <AdminTable />
          </div>
        </div>
      </div>
    </>
  );
}
