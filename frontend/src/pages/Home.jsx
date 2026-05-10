import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.isAdmin) {
      navigate("/admin");
    }
  }, [user]);

  return (
    <>
      <section className="heading">
        <h1 className="">What do you need help with?</h1>
        <p className="mt-10">Choose from the option below</p>
      </section>

      <Link to={"/new-ticket"} className="btn btn-block btn-reverse">
        <FaQuestionCircle /> Create New Ticket
      </Link>
      <Link to={"/tickets"} className="btn btn-block ">
        <FaTicketAlt /> View My Tickets
      </Link>

      <br className="pt-10" />
    </>
  );
}

export default Home;
