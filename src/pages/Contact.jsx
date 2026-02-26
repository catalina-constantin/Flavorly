import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import styles from "../styles/pages/Contact.module.css";

function Contact() {
  const [formData, setFormData] = useState(() => {
    const savedDraft = localStorage.getItem("contact_draft");
    return savedDraft
      ? JSON.parse(savedDraft)
      : { name: "", email: "", message: "" };
  });

  useEffect(() => {
    localStorage.setItem("contact_draft", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const isFormComplete =
    formData.name.trim() && formData.email.trim() && formData.message.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase.from("contact_messages").insert([
        {
          full_name: formData.name,
          email: formData.email,
          message: formData.message,
        },
      ]);

      if (error) throw error;

      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
      localStorage.removeItem("contact_draft");
    } catch (error) {
      console.error("Error sending message:", error.message);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <section className={styles["contact-container"]}>
      <h1 className={styles["visually-hidden"]}>Contact Us</h1>
      <div className={styles["content"]}>
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

        <div className={styles["right-side"]}>
          <h2 className={styles["topic-text"]}>Send us a message</h2>
          <p>
            Have a secret recipe to share or found a bug while filtering your
            favorite ingredients? Our team is ready to assist you. Drop us a
            line below!
          </p>

          <form onSubmit={handleSubmit}>
            <div className={styles["input-box"]}>
              <div className={styles["input-box"]}>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>
            </div>

            <div className={styles["input-box"]}>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
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
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className={styles["button"]}>
              <button
                type="submit"
                className={
                  isFormComplete ? styles["active"] : styles["disabled"]
                }
                disabled={!isFormComplete}
              >
                Send Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
