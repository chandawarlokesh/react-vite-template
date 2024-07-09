import { ACCESS_TOKEN_NAME } from "../constants/apiConstants";

import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";

const PrivateRoutes = () =>
  localStorage.getItem(ACCESS_TOKEN_NAME) ? (
    <div className="flex w-full flex-col">
      <Header />
      <div className="p-4 lg:px-6">
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );

export default PrivateRoutes;
