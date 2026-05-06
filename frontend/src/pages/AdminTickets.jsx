import React from "react";
import BackButton from "../components/BackButton";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAdminTickets, reset } from "../features/ticket/ticketSlice";
import Spinner from "../components/Spinner";
import TicketItem from "../components/TicketItem";
import { disable } from "colors";

function AdminTickets() {
  const { isLoading, isSuccess, tickets } = useSelector(
    (state) => state.tickets,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [isSuccess, dispatch]);

  useEffect(() => {
    dispatch(getAdminTickets());
  }, [dispatch]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <BackButton url={"/admin"} />
      <section className="heading">
        <h1>Tickets</h1>
      </section>

      <div className="tickets">
        {tickets.length >= 1 ? (
          <>
            <div className="ticket-headings">
              <div>Date</div>
              <div>Product</div>
              <div>Status</div>
              <div></div>
            </div>

            {tickets.map((ticket) => (
              <TicketItem key={ticket._id} ticket={ticket} />
            ))}
          </>
        ) : (
          <h1>You do not have any ticket...</h1>
        )}
      </div>
    </>
  );
}

export default AdminTickets;
