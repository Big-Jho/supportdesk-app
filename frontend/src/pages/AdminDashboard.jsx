import React from "react";
import BackButton from "../components/BackButton";
import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";

function AdminDashboard() {
  return (
    <>
      <section className="heading">
        <h1 className="">Admin Dashboard</h1>
      </section>

      <Link to={"/admin/tickets"} className="btn btn-block btn-reverse">
        <FaTicketAlt /> Get All Tickets
      </Link>
      <br className="pt-10" />
    </>
  );
}

export default AdminDashboard;
