import { Outlet, Navigate } from "react-router-dom";
import checkAuth from "../app/auth";

const RootPage = () => {
  const token = checkAuth();
  if (!token) {
    <Navigate to="/login" />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default RootPage;
