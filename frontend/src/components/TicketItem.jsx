import { Link } from "react-router-dom";

function TicketItem({ ticket, admin }) {
  return (
    <div className={`ticket ${admin ? "grid-cols-5" : "grid-cols-4"}`}>
      <div>{new Date(ticket.createdAt).toLocaleDateString()}</div>
      {admin && <div>{ticket.user.name}</div>}
      <div>{ticket.product}</div>
      <div className={`status status-${ticket.status}`}>{ticket.status}</div>

      {admin ? (
        <Link
          className="btn btn-reverse btn-sm"
          to={`/admin/ticket/${ticket._id}`}
        >
          View
        </Link>
      ) : (
        <Link className="btn btn-reverse btn-sm" to={`/ticket/${ticket._id}`}>
          View
        </Link>
      )}
    </div>
  );
}

export default TicketItem;
