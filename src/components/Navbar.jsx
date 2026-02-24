import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import Logo from "./Logo";
import AuthActions from "./AuthActions";
import "../styles/Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    dispatch(logout());
    closeMenu();
    navigate("/login");
  };

  return (
    <header className="navbar-header">
      <nav className="navbar-nav">
        <div className="navbar-brand">
          <Logo onClick={closeMenu} />
        </div>

        {isOpen && <div className="menu-overlay" onClick={closeMenu}></div>}

        <button
          className={`hamburger ${isOpen ? "is-active" : ""}`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <div className={`nav-container ${isOpen ? "show" : ""}`}>
          <ul className="nav-menu">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `nav-item${isActive ? " active" : ""}`
                }
                onClick={closeMenu}
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
                onClick={closeMenu}
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
                onClick={closeMenu}
              >
                Contact
              </NavLink>
            </li>
          </ul>

          <div className="nav-actions">
            <AuthActions
              isAuthenticated={isAuthenticated}
              user={user}
              handleLogout={handleLogout}
              closeMenu={closeMenu}
            />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
