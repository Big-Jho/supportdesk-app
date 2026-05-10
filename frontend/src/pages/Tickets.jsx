import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTickets, reset } from "../features/ticket/ticketSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import TicketItem from "../components/TicketItem";

function Tickets() {
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
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <BackButton url={"/"} />
      <section className="heading">
        <h1>Tickets</h1>
      </section>

      <div className="tickets">
        {tickets.length >= 1 ? (
          <>
            <div className="ticket-headings grid-cols-4">
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

      <br className="pt-10" />
    </>
  );
}

export default Tickets;
