import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import "../styles/Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  const handleSocialClick = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <footer className="footer-container">
      <p className="copyright-text">
        Copyright &copy; {currentYear} - All Rights Reserved
      </p>
      <div className="social-icons">
        <button
          className="social-button"
          onClick={() => handleSocialClick("https://facebook.com")}
          aria-label="Visit our Facebook page"
        >
          <Facebook size={20} />
        </button>

        <button
          className="social-button"
          onClick={() => handleSocialClick("https://instagram.com")}
          aria-label="Visit our Instagram page"
        >
          <Instagram size={20} />
        </button>

        <button
          className="social-button"
          onClick={() => handleSocialClick("https://twitter.com")}
          aria-label="Visit our Twitter page"
        >
          <Twitter size={20} />
        </button>
      </div>
    </footer>
  );
}

export default Footer;
