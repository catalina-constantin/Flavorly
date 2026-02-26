import React from "react";
import styles from "../../styles/contact/ContactDetails.module.css";

const ContactDetails = () => (
  <div className={styles["left-side"]}>
    <img
      src="/logo.png"
      alt="Flavorly logo"
      className={styles["contact-image"]}
      width="120"
      height="120"
      loading="lazy"
    />
    <address className={`${styles["phone"]} ${styles["details"]}`}>
      <i className="fas fa-phone-alt" aria-hidden="true"></i>
      <h2 className={styles["topic"]}>Phone support</h2>
      <div className={styles["text-one"]}>+40 722 000 000</div>
      <div className={styles["text-two"]}>+40 31 100 00 00</div>
    </address>

    <address className={`${styles["email"]} ${styles["details"]}`}>
      <i className="fas fa-envelope" aria-hidden="true"></i>
      <h2 className={styles["topic"]}>Email</h2>
      <div className={styles["text-one"]}>chef@flavorly.com</div>
      <div className={styles["text-two"]}>support@flavorly.com</div>
    </address>
  </div>
);

export default ContactDetails;
