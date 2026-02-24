import React from "react";
import { Link } from "react-router-dom";
import "../styles/Logo.css";

function Logo({ className = "" }) {
  return (
    <Link to="/" className={`logo-container ${className}`}>
      <img src="/logo.png" alt="Flavorly" className="logo-img" />
      <span className="logo-text">Flavorly</span>
    </Link>
  );
}

export default Logo;
