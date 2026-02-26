import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/common/AuthActions.module.css";

function AuthActions({ isAuthenticated, handleLogout, closeMenu }) {
  if (isAuthenticated) {
    return (
      <div className={styles["user-section"]}>
        <button onClick={handleLogout} className={styles["btn-logout"]}>
          Log Out
        </button>
      </div>
    );
  }

  return (
    <div className={styles["auth-buttons"]}>
      <Link to="/login" className={styles["btn-login"]} onClick={closeMenu}>
        Login
      </Link>
      <Link
        to="/register"
        className={styles["btn-register"]}
        onClick={closeMenu}
      >
        Register
      </Link>
    </div>
  );
}

export default AuthActions;
