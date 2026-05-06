import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const useAdminStatus = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && user.isAdmin) {
      setIsAdmin(true);
      setCheckingStatus(false);
    } else {
      setIsAdmin(false);
      setCheckingStatus(false);
    }
  }, [user]);

  return [checkingStatus, isAdmin];
};
