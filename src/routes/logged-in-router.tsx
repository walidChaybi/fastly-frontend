import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Restaurants from "../pages/client/restaurants";
import NotFound from "../pages/404";
import Header from "../components/Header";
import { useMe } from "../hooks/useMe";
import ConfirmEmail from "../pages/user/confirm-email";
import EditProfile from "../pages/user/edit-profile";

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();

  if (loading || error || !data) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="custom-loader"></div>
        <span className="font-bold text-xl m-10">Loading ...</span>
      </div>
    );
  }

  return (
    <div>
      <Router>
        <Header />
        <Routes>
          {data.me.role === "Owner" && (
            <Route path="/" element={<Restaurants />}></Route>
          )}
          {/* <Route path="/*" element={<Navigate to="/" />}></Route> */}
          <Route path="*" element={<NotFound />}></Route>
          <Route path="/confirm" element={<ConfirmEmail />}></Route>
          <Route path="/edit-profile" element={<EditProfile />}></Route>
        </Routes>
      </Router>
    </div>
  );
};
