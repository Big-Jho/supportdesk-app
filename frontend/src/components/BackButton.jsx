import { Link, useNavigate } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";

function BackButton({ url }) {
  const navigate = useNavigate();
  return (
    <Link to={url}>
      <button className="btn btn-reverse">
        <FaArrowAltCircleLeft /> Back
      </button>
    </Link>
  );
}

export default BackButton;
