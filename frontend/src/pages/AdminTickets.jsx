import React from "react";
import BackButton from "../components/BackButton";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAdminTickets, reset } from "../features/ticket/ticketSlice";
import Spinner from "../components/Spinner";
import TicketItem from "../components/TicketItem";

function AdminTickets() {
  const { isLoading, isSuccess, tickets } = useSelector(
    (state) => state.tickets,
  );

  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [isSuccess, dispatch]);

  useEffect(() => {
    dispatch(getAdminTickets(filter));
  }, [dispatch, filter]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <BackButton url={"/admin"} />
      <section className="heading">
        <h1>Tickets</h1>
      </section>

      <div className="tickets pb-10">
        <>
          <div className="ticket-headings grid-cols-5">
            <div>Date</div>
            <div>Name</div>
            <div>Product</div>
            <div>Status</div>
            <select
              className="focus:outline-0"
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
            >
              <option value="">No Filter</option>
              <option value="new">New</option>
              <option value="opened">Opened</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          {tickets.length >= 1 ? (
            tickets.map((ticket) => (
              <TicketItem admin={true} key={ticket._id} ticket={ticket} />
            ))
          ) : (
            <h1>You do not have any {filter} ticket...</h1>
          )}
        </>

        <br className="pt-10" />
      </div>
    </>
  );
}

export default AdminTickets;
