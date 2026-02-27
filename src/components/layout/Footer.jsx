import React from "react";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";
import SocialIconButton from "../common/buttons/SocialIconButton";
import styles from "../../styles/layout/Footer.module.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles["footer-container"]}>
      <p className={styles["copyright-text"]}>
        Copyright &copy; {currentYear} - All Rights Reserved
      </p>
      <div className={styles["social-icons"]}>
        <SocialIconButton
          url="https://facebook.com"
          ariaLabel="Visit our Facebook page"
          className={styles["social-button"]}
        >
          <SiFacebook size={20} />
        </SocialIconButton>
        <SocialIconButton
          url="https://instagram.com"
          ariaLabel="Visit our Instagram page"
          className={styles["social-button"]}
        >
          <SiInstagram size={20} />
        </SocialIconButton>
        <SocialIconButton
          url="https://x.com"
          ariaLabel="Visit our X page"
          className={styles["social-button"]}
        >
          <SiX size={20} />
        </SocialIconButton>
      </div>
    </footer>
  );
}

export default Footer;
