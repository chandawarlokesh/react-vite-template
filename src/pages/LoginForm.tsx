import { useEffect, useState } from "react";
import { ACCESS_TOKEN_NAME } from "../constants/apiConstants";
import { useNavigate } from "react-router-dom";
import usePost from "../services/usePost";
import Logo from "../components/Logo";

interface LoginFormProps {
  showError: (val: null | string) => void;
}

const LoginForm = ({ showError }: LoginFormProps) => {
  const navigate = useNavigate();
  const [state, setState] = useState<{
    email: string;
    password: string;
    successMessage: null | string;
  }>({
    email: "",
    password: "",
    successMessage: null,
  });

  useEffect(() => {
    localStorage.removeItem(ACCESS_TOKEN_NAME);
  }, []);

  const { mutate } = usePost("/login", {
    onSuccess: (response) => {
      setState((prevState) => ({
        ...prevState,
        successMessage: "Login successful. Redirecting to home page..",
      }));
      localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
      setTimeout(() => {
        redirectToHome();
      }, 3000);
      showError(null);
    },
    onError: (response) => {
      if (response.status === 204) {
        showError("Username and password do not match");
      } else {
        showError("Username does not exists");
      }
    },
  });

  const handleChange = (e: { target: { id: string; value: string } }) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (state.email && state.password) {
      const payload = {
        email: state.email,
        password: state.password,
      };
      mutate(payload);
    } else {
      showError("Please enter valid username and password");
    }
  };

  const redirectToHome = () => {
    navigate("/home");
  };
  const redirectToRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="w-full md:w-1/2 flex flex-col">
        <Logo className="pt-12 md:pl-12 md:-mb-24" />
        <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
          <p className="text-center text-3xl">Welcome.</p>
          <form className="flex flex-col pt-3 md:pt-8">
            <div className="flex flex-col pt-4">
              <label htmlFor="email" className="text-lg">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={state.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="flex flex-col pt-4">
              <label htmlFor="password" className="text-lg">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={state.password}
                onChange={handleChange}
                placeholder="Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <input
              type="submit"
              onClick={handleSubmitClick}
              value="Log In"
              className="cursor-pointer bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
            />
          </form>
          <div
            className="alert alert-success mt-2"
            style={{ display: state.successMessage ? "block" : "none" }}
            role="alert"
          >
            {state.successMessage}
          </div>
          <div className="text-center pt-12 pb-12">
            <p>
              Don't have an account?{" "}
              <a
                href="#"
                onClick={() => redirectToRegister()}
                className="underline font-semibold"
              >
                Register here.
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="w-1/2 shadow-2xl">
        <div className="object-cover w-full h-screen hidden md:block bg-black" />
      </div>
    </>
  );
};

export default LoginForm;
