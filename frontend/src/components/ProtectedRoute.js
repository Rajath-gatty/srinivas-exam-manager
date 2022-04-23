import { Outlet } from "react-router-dom";
import { useContextData } from "../hooks/useContextData";
import PageNotFound from "../pages/PageNotFound/PageNotFound";

const ProtectedRoute = ({ allowedRole }) => {
  const { role } = useContextData();
  return allowedRole.find((item) => item === role) ? (
    <Outlet />
  ) : (
    <PageNotFound />
  );
};

export default ProtectedRoute;
