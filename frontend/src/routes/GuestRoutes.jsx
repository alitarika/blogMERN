import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const GuestRoutes = () => {
  const { user } = useContext(UserContext);
  return user.username ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default GuestRoutes;
