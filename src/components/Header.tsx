import logo from "../assets/logo.png";
import { useMe } from "../hooks/useMe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUtensils,
  faPersonBiking,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const iconMap = {
  Client: faUser,
  Owner: faUtensils,
  Delivery: faPersonBiking,
};

function Header() {
  const { data } = useMe();
  return (
    <>
      {!data?.me.verified && (
        <div className="bg-red-500 px-3 py-3 text-center text-slate-200">
          <Link to="/confirm">
            <span>Please verify your email</span>
          </Link>
        </div>
      )}
      <header className="px-4 bg-slate-100 py-4">
        <div className="w-full max-w-screen-xl mx-auto  flex justify-between items-center">
          <Link to="/">
            <img src={logo} alt="logo" className="w-36" />
          </Link>
          <Link to="/edit-profile">
            <div className="text-xs flex gap-2 items-center bg-primary text-slate-900 rounded py-2 px-4">
              <FontAwesomeIcon
                icon={iconMap[data?.me.role || "Client"]}
                className="text-lg "
              />
              <span className="text-slate-900">{data?.me.email}</span>
            </div>
          </Link>
        </div>
      </header>
    </>
  );
}

export default Header;
