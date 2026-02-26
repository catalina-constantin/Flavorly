import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import Logo from "../common/Logo";
import AuthActions from "../common/AuthActions";
import styles from "../../styles/layout/Navbar.module.css";

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
    <header className={styles["navbar-header"]}>
      <nav className={styles["navbar-nav"]}>
        <div className={styles["navbar-brand"]}>
          <Logo onClick={closeMenu} />
        </div>

        {isOpen && (
          <div className={styles["menu-overlay"]} onClick={closeMenu}></div>
        )}

        <button
          className={`${styles["hamburger"]} ${isOpen ? styles["is-active"] : ""}`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span className={styles["bar"]}></span>
          <span className={styles["bar"]}></span>
          <span className={styles["bar"]}></span>
        </button>

        <div
          className={`${styles["nav-container"]} ${isOpen ? styles["show"] : ""}`}
        >
          <ul className={styles["nav-menu"]}>
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `${styles["nav-item"]}${isActive ? ` ${styles["active"]}` : ""}`
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
                  `${styles["nav-item"]}${isActive ? ` ${styles["active"]}` : ""}`
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
                  `${styles["nav-item"]}${isActive ? ` ${styles["active"]}` : ""}`
                }
                onClick={closeMenu}
              >
                Contact
              </NavLink>
            </li>
          </ul>

          <div className={styles["nav-actions"]}>
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
