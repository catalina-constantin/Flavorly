import React, { useEffect, useState } from "react";
import Loading from "../components/common/Loading";
import { supabase } from "../supabaseClient";
import { Mail } from "lucide-react";
import InboxHeader from "../components/inbox/InboxHeader";
import MessageCard from "../components/inbox/MessageCard";
import styles from "../styles/pages/Inbox.module.css";
import { showErrorToast, showSuccessToast } from "../utils/toastHelpers";

function Inbox() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_messages")
      .select("id, full_name, email, message, created_at")
      .order("created_at", { ascending: false });

    if (error) showErrorToast("Failed to fetch messages");
    else setMessages(data || []);
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchMessages();
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?"))
      return;
    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", id);
    if (error) showErrorToast("Could not delete message");
    else {
      showSuccessToast("Message deleted");
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    }
  };

  const handleSendEmail = (email, fullName, answer) => {
    const subject = encodeURIComponent("Re: Your message to Flavorly");
    const body = encodeURIComponent(`Hi ${fullName},\n\n${answer}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <section className={styles["inbox-page"]}>
      <div className={styles["inbox-container"]}>
        <InboxHeader count={messages.length} />

        {loading ? (
          <Loading />
        ) : messages.length === 0 ? (
          <div className={styles["empty-state"]}>
            <Mail size={48} />
            <p>Your inbox is empty. No spice here yet!</p>
          </div>
        ) : (
          <div className={styles["messages-grid"]}>
            {messages.map((msg) => (
              <MessageCard
                key={msg.id}
                msg={msg}
                onDelete={handleDelete}
                onSendEmail={handleSendEmail}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Inbox;
