import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from "../constants/apiConstants";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_NAME);
    navigate("/login");
  }, [navigate]);

  return (
    <button
      className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
      onClick={() => handleLogout()}
    >
      Logout
    </button>
  );
};

export default Logout;
