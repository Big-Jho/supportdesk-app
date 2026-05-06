import { Outlet, useNavigate } from "react-router-dom";
import { useAdminStatus } from "../hooks/useAdminStatus";
import Spinner from "./Spinner";

const AdminRoute = () => {
  const [checkingStatus, isAdmin] = useAdminStatus();

  const navigate = useNavigate();

  if (checkingStatus) return <Spinner />;

  return isAdmin ? <Outlet /> : navigate("/login");
};

export default AdminRoute;
