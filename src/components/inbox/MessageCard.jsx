import React, { useState } from "react";
import { Clock, Trash2, Reply, Send, X } from "lucide-react";
import styles from "../../styles/pages/Inbox.module.css";

const MessageCard = ({ msg, onDelete, onSendEmail }) => {
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [answer, setAnswer] = useState("");

  const handleSend = () => {
    onSendEmail(msg.email, msg.full_name, answer);
    setAnswer("");
    setIsReplyOpen(false);
  };

  return (
    <div className={styles["message-card"]}>
      <div className={styles["card-header"]}>
        <div className={styles["sender-info"]}>
          <div className={styles["user-group"]}>
            <div className={styles["avatar"]}>
              {msg.full_name.charAt(0).toUpperCase()}
            </div>
            <div className={styles["user-details"]}>
              <h3 className={styles["user-name"]}>{msg.full_name}</h3>
              <span className={styles["email"]}>{msg.email}</span>
            </div>
          </div>
          <div className={styles["action-buttons"]}>
            <button
              className={styles["reply-btn"]}
              onClick={() => setIsReplyOpen(!isReplyOpen)}
            >
              <Reply size={18} />
            </button>
            <button
              onClick={() => onDelete(msg.id)}
              className={styles["delete-btn"]}
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles["message-content"]}>
        <p>{msg.message}</p>
      </div>

      {isReplyOpen && (
        <div className={styles["reply-section"]}>
          <textarea
            placeholder={`Type your answer to ${msg.full_name}...`}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <div className={styles["reply-actions"]}>
            <button
              className={styles["cancel-btn"]}
              onClick={() => setIsReplyOpen(false)}
            >
              <X size={16} /> Cancel
            </button>
            <button
              className={styles["send-btn"]}
              disabled={!answer.trim()}
              onClick={handleSend}
            >
              <Send size={16} /> Send Email
            </button>
          </div>
        </div>
      )}

      <div className={styles["card-footer"]}>
        <Clock size={14} />
        <span>
          {new Date(msg.created_at).toLocaleDateString()} at{" "}
          {new Date(msg.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};

export default MessageCard;
