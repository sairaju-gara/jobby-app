import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FaHome, FaBriefcase } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import "./index.css";

const Header = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const confirmLogout = () => {
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
          <button
            className="logout-btn"
            type="button"
            onClick={() => setShowPopup(true)}
          >
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
            <button
              className="logout-btn"
              type="button"
              onClick={() => setShowPopup(true)}
            >
              <FiLogOut size={22} />
            </button>
          </li>
        </ul>
      </nav>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-container">
            <h3>Are you sure you want to logout?</h3>
            <div className="popup-buttons">
              <button
                className="cancel-btn"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
              <button className="confirm-btn" onClick={confirmLogout}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
