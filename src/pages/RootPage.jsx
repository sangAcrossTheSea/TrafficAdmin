import { Outlet } from "react-router-dom";
// import checkAuth from "../app/auth";

const RootPage = () => {
  //   const token = checkAuth();
  //   if (!token) {
  //     return null;
  //   }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default RootPage;
