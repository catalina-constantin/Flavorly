import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import Logo from "./Logo";
import "../styles/Navbar.css";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="navbar-header">
      <nav className="navbar-nav">
        <div className="navbar-brand">
          <Logo />
        </div>

        <ul className="nav-menu">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-item${isActive ? " active" : ""}`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/recipes"
              className={({ isActive }) =>
                `nav-item${isActive ? " active" : ""}`
              }
            >
              Recipes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `nav-item${isActive ? " active" : ""}`
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>

        <div className="nav-actions">
          {isAuthenticated ? (
            <div className="user-section">
              <span className="user-email">{user?.email}</span>
              <button onClick={handleLogout} className="btn-logout">
                Log Out
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn-login">
                Login
              </Link>
              <Link to="/register" className="btn-register">
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
