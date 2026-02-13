import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FaHome, FaBriefcase } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

import "./index.css";

const Header = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login", { replace: true });
  };

  return (
    <>
      <nav className="nav-header-md">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="app-logo"
            alt="website logo"
          />
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="home">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/jobs" className="jobs">
              Jobs
            </Link>
          </li>
        </ul>
        <li className="nav-item">
          <button className="logout-btn" type="button" onClick={onLogout}>
            Logout
          </button>
        </li>
      </nav>

      <nav className="nav-header-sm">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="app-logo"
            alt="website logo"
          />
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="home">
              <FaHome size={24} />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/jobs" className="jobs">
              <FaBriefcase size={24} />
            </Link>
          </li>
          <li className="nav-item">
            <button className="logout-btn" type="button" onClick={onLogout}>
              <FiLogOut size={22} />
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
