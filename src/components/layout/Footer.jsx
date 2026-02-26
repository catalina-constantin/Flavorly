import React from "react";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";
import styles from "../../styles/layout/Footer.module.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  const handleSocialClick = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <footer className={styles["footer-container"]}>
      <p className={styles["copyright-text"]}>
        Copyright &copy; {currentYear} - All Rights Reserved
      </p>
      <div className={styles["social-icons"]}>
        <button
          className={styles["social-button"]}
          onClick={() => handleSocialClick("https://facebook.com")}
          aria-label="Visit our Facebook page"
        >
          <SiFacebook size={20} />
        </button>

        <button
          className={styles["social-button"]}
          onClick={() => handleSocialClick("https://instagram.com")}
          aria-label="Visit our Instagram page"
        >
          <SiInstagram size={20} />
        </button>

        <button
          className={styles["social-button"]}
          onClick={() => handleSocialClick("https://x.com")}
          aria-label="Visit our X page"
        >
          <SiX size={20} />
        </button>
      </div>
    </footer>
  );
}

export default Footer;
