import React from "react";
import styles from "../../styles/contact/ContactForm.module.css";

const ContactForm = ({ formData, onChange, onSubmit, isFormComplete }) => (
  <div className={styles["right-side"]}>
    <h2 className={styles["topic-text"]}>Send us a message</h2>
    <p>
      Have a secret recipe to share or found a bug while filtering your favorite
      ingredients? Our team is ready to assist you. Drop us a line below!
    </p>

    <form onSubmit={onSubmit}>
      <div className={styles["input-box"]}>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter your name"
          value={formData.name}
          onChange={onChange}
          autoComplete="name"
          required
        />
      </div>

      <div className={styles["input-box"]}>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={onChange}
          autoComplete="email"
          required
        />
      </div>

      <div className={`${styles["input-box"]} ${styles["message-box"]}`}>
        <textarea
          id="message"
          name="message"
          placeholder="Message details..."
          value={formData.message}
          onChange={onChange}
          required
        ></textarea>
      </div>

      <div className={styles["button"]}>
        <button
          type="submit"
          className={isFormComplete ? styles["active"] : styles["disabled"]}
          disabled={!isFormComplete}
        >
          Send Now
        </button>
      </div>
    </form>
  </div>
);

export default ContactForm;
