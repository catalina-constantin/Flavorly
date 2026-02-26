import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import ContactDetails from "../components/contact/ContactDetails";
import ContactForm from "../components/contact/ContactForm";
import styles from "../styles/pages/Contact.module.css";
import { showSuccessToast, showErrorToast } from "../utils/toastHelpers";

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

      showSuccessToast("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
      localStorage.removeItem("contact_draft");
    } catch {
      showErrorToast("Failed to send message. Please try again.");
    }
  };

  return (
    <section className={styles["contact-container"]}>
      <h1 className={styles["visually-hidden"]}>Contact Us</h1>
      <div className={styles["content"]}>
        <ContactDetails />
        <ContactForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          isFormComplete={isFormComplete}
        />
      </div>
    </section>
  );
}

export default Contact;
