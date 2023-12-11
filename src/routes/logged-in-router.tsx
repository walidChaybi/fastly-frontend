import { meQuery } from "../__generated__/meQuery";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import Restaurants from "../pages/client/restaurants";
import NotFound from "../pages/404";

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
    }
  }
`;

export const LoggedInRouter = () => {
  const { data, loading, error } = useQuery<meQuery>(ME_QUERY);

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
          <Route path="/*" element={<Navigate to="/" />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    </div>
  );
};
