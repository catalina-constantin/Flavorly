import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import styles from "../styles/pages/Inbox.module.css";

function Inbox() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("contact_messages")
        .select("id, full_name, email, message, created_at")
        .order("created_at", { ascending: false });
      if (!error) setMessages(data || []);
      setLoading(false);
    };
    fetchMessages();
  }, []);

  return (
    <section className={styles["inbox-container"]}>
      <h1>Inbox</h1>
      {loading ? (
        <div className={styles["loading"]}>Loading messages...</div>
      ) : messages.length === 0 ? (
        <div className={styles["empty"]}>No messages found.</div>
      ) : (
        <ul className={styles["messages-list"]}>
          {messages.map((msg) => (
            <li key={msg.id} className={styles["message-card"]}>
              <div className={styles["message-header"]}>
                <span className={styles["sender"]}>{msg.full_name}</span>
                <span className={styles["email"]}>{msg.email}</span>
                <span className={styles["date"]}>
                  {new Date(msg.created_at).toLocaleString()}
                </span>
              </div>
              <div className={styles["message-body"]}>{msg.message}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Inbox;
