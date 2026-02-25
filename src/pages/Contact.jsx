import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import "../styles/Contact.css";

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
    <section className="contact-container">
      <h1 className="visually-hidden">Contact Us</h1>
      <div className="content">
        <div className="left-side">
          <img
            src="/logo.png"
            alt="Flavorly logo"
            className="contact-image"
            width="120"
            height="120"
            loading="lazy"
          />
          <address className="phone details">
            <i className="fas fa-phone-alt" aria-hidden="true"></i>
            <h2 className="topic">Phone support</h2>
            <div className="text-one">+40 722 000 000</div>
            <div className="text-two">+40 31 100 00 00</div>
          </address>

          <address className="email details">
            <i className="fas fa-envelope" aria-hidden="true"></i>
            <h2 className="topic">Email</h2>
            <div className="text-one">chef@flavorly.com</div>
            <div className="text-two">support@flavorly.com</div>
          </address>
        </div>

        <div className="right-side">
          <h2 className="topic-text">Send us a message</h2>
          <p>
            Have a secret recipe to share or found a bug while filtering your
            favorite ingredients? Our team is ready to assist you. Drop us a
            line below!
          </p>

          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <div className="input-box">
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

            <div className="input-box">
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

            <div className="input-box message-box">
              <textarea
                id="message"
                name="message"
                placeholder="Message details..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="button">
              <button
                type="submit"
                className={isFormComplete ? "active" : "disabled"}
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
