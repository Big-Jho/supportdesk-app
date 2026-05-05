import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTicket, reset, closeTicket } from "../features/ticket/ticketSlice";
import {
  getNotes,
  createNotes,
  reset as noteReset,
} from "../features/note/noteSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import NoteItem from "../components/NoteItem";
import { toast } from "react-toastify";
import { FaPlus, FaTimes } from "react-icons/fa";
import Modal from "react-modal";

const customStyles = {
  content: {
    width: "95%", // responsive on small screens
    maxWidth: "600px", // never exceed 600px
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};

Modal.setAppElement("#root");

function Ticket() {
  const { isLoading, isSuccess, ticket, message, isError } = useSelector(
    (state) => state.tickets,
  );

  const { notes, isLoading: noteIsLoading } = useSelector(
    (state) => state.notes,
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ticketId } = useParams();

  const [modalIsOpen, setIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const onNoteSubmit = (e) => {
    e.preventDefault();

    dispatch(createNotes({ noteText, ticketId }));

    closeModal();
  };

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
  }, [dispatch, ticketId, isError, message]);

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    navigate("/tickets");
    toast.success("Ticket closed");
  };

  if (isError) return <h3>Something went wrong</h3>;

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="ticket-page">
        <header className="ticket-header">
          <BackButton url={"/tickets"} />
        </header>

        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>

        <h3>
          Date Submitted :{" "}
          {new Date(ticket.createdAt).toLocaleDateString("en-US")}
        </h3>

        <h3>Product: {ticket.product}</h3>

        <hr />

        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>

        <h2>Notes</h2>

        {ticket.status !== "closed" && (
          <button className="btn" onClick={openModal}>
            <FaPlus /> Add Note
          </button>
        )}

        {notes ? (
          notes.map((note) => <NoteItem key={note._id} note={note} />)
        ) : (
          <Spinner />
        )}

        <Modal
          isOpen={modalIsOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Add Note"
        >
          <h2>Add Note</h2>
          <button className="btn-close" onClick={closeModal}>
            <FaTimes />
          </button>

          <form onSubmit={onNoteSubmit}>
            <div className="form-group">
              <textarea
                name="noteText"
                id="noteText"
                className="form-control"
                placeholder="Note Text"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              ></textarea>
            </div>

            <div className="form-group">
              <button className="btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </Modal>

        {ticket.status !== "closed" && (
          <button className="btn btn-block btn-danger" onClick={onTicketClose}>
            Close Ticket
          </button>
        )}
      </div>
    </>
  );
}

export default Ticket;
