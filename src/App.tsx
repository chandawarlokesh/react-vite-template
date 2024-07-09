import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import RegistrationForm from "./pages/RegistrationForm";
import LoginForm from "./pages/LoginForm";
import Home from "./pages/Home";
import ErrorAlert from "./components/ErrorAlert";
import PrivateRoutes from "./components/PrivateRoutes";
import About from "./pages/About";

function App() {
  const [errorMessage, updateErrorMessage] = useState<null | string>(null);
  return (
    <div className="bg-white font-family-karla h-screen">
      <div className="w-full flex flex-wrap">
        <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Route>
            <Route
              path="/register"
              element={<RegistrationForm showError={updateErrorMessage} />}
            />
            <Route
              path="/login"
              element={<LoginForm showError={updateErrorMessage} />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <ErrorAlert
            errorMessage={errorMessage}
            hideError={updateErrorMessage}
          />
        </Router>
      </div>
    </div>
  );
}

export default App;
