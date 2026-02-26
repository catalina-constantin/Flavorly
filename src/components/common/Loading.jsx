import React from "react";
import styles from "../../styles/common/Loading.module.css";

const Loading = ({ message = "Flavorly is heating up..." }) => {
  return (
    <div
      className={styles["loading-container"]}
      role="status"
      aria-live="polite"
    >
      <div className={styles.spinner} aria-hidden="true" />
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default Loading;
