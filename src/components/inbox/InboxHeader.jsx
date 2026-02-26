import React from "react";
import styles from "../../styles/pages/Inbox.module.css";

const InboxHeader = ({ count }) => (
  <header className={styles["inbox-header"]}>
    <h1>Admin inbox</h1>
    <p>
      Managing <span>{count} messages</span> from your community
    </p>
  </header>
);

export default InboxHeader;
