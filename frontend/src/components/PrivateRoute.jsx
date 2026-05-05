import { Outlet, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "./Spinner";

const PrivateRoute = () => {
  const [checkingStatus, loggedIn] = useAuthStatus();
  const navigate = useNavigate();

  if (checkingStatus) return <Spinner />;

  return loggedIn ? <Outlet /> : navigate("/login");
};

export default PrivateRoute;
