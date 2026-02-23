import React from "react";
import { IconButton } from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";

import "../styles/Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <p className="copyright-text">
        Copyright &copy; {currentYear} - All Rights Reserved
      </p>
      <div className="social-icons">
        <IconButton href="https://facebook.com" target="_blank">
          <Facebook />
        </IconButton>

        <IconButton href="https://instagram.com" target="_blank">
          <Instagram />
        </IconButton>
        <IconButton href="https://twitter.com" target="_blank">
          <Twitter />
        </IconButton>
      </div>
    </footer>
  );
}

export default Footer;
