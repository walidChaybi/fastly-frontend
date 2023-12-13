import logo from "../assets/logo.png";
import { useMe } from "../hooks/useMe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Header() {
  const { data } = useMe();
  return (
    <>
      {!data?.me.verified && (
        <div className="bg-red-500 px-3 py-3 text-center text-slate-200">
          <span>Please verify your email</span>
        </div>
      )}
      <header className="px-4 bg-slate-100 py-4">
        <div className="w-full max-w-screen-xl mx-auto  flex justify-between items-center">
          <img src={logo} alt="logo" className="w-36" />
          <span className="text-xs">
            <Link to="/my-profile">
              <FontAwesomeIcon icon={faUser} className="text-lg" />
            </Link>
          </span>
        </div>
      </header>
    </>
  );
}

export default Header;
