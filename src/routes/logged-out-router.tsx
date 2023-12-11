import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateAccount from "../pages/create-account";
import Login from "../pages/login";

interface IForm {
  email: string;
  password: string;
}

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/create-account" element={<CreateAccount />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </Router>
  );
};
