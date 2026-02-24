import React from "react";
import { Link } from "react-router-dom";
import "../styles/AuthActions.css";

function AuthActions({ isAuthenticated, handleLogout, closeMenu }) {
  if (isAuthenticated) {
    return (
      <div className="user-section">
        <button onClick={handleLogout} className="btn-logout">
          Log Out
        </button>
      </div>
    );
  }

  return (
    <div className="auth-buttons">
      <Link to="/login" className="btn-login" onClick={closeMenu}>
        Login
      </Link>
      <Link to="/register" className="btn-register" onClick={closeMenu}>
        Register
      </Link>
    </div>
  );
}

export default AuthActions;
