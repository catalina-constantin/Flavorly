import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/common/Logo.module.css";

function Logo({ className = "" }) {
  return (
    <Link to="/" className={`${styles["logo-container"]} ${className}`}>
      <img
        src="/logo.png"
        alt="Flavorly"
        className={styles["logo-img"]}
        width="68"
        height="68"
      />
      <span className={styles["logo-text"]}>Flavorly</span>
    </Link>
  );
}

export default Logo;
