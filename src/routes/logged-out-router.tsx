import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateAccount from "../pages/create-account";
import Login from "../pages/login";
import NotFound from "../pages/404";

interface IForm {
  email: string;
  password: string;
}

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/create-account" element={<CreateAccount />}></Route>
        <Route path="/" element={<Login />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
};
