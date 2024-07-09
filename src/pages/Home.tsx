import { useCallback, useEffect, useState } from "react";
import { ACCESS_TOKEN_NAME, API_BASE_URL } from "../constants/apiConstants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<null | { email: string; name: string }>(
    null
  );

  const redirectToLogin = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    axios
      .get(API_BASE_URL + "/me", {
        headers: { token: localStorage.getItem(ACCESS_TOKEN_NAME) },
      })
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data);
        } else {
          redirectToLogin();
        }
      })
      .catch(() => {
        redirectToLogin();
      });
  }, [redirectToLogin]);

  return <div className="mt-2">Welcome, {user?.name || ""}</div>;
};

export default Home;
