import React from "react";
import { AlertTriangle } from "lucide-react";
import styles from "../../styles/modals/ConfirmModal.module.css";

const ConfirmModal = ({ isOpen, onClose, onConfirm, recipeName }) => {
  if (!isOpen) return null;

  const handleConfirm = async () => {
    await onConfirm();
  };

  return (
    <div className={styles["modal-overlay"]} onClick={onClose}>
      <div
        className={styles["modal-content"]}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles["modal-icon"]}>
          <AlertTriangle size={48} />
        </div>
        <h2 className={styles["modal-title"]}>Delete Recipe?</h2>
        <p className={styles["modal-message"]}>
          Are you sure you want to delete "{recipeName}"?
        </p>
        <p className={styles["modal-warning"]}>
          This action is permanent and cannot be undone.
        </p>
        <div className={styles["modal-actions"]}>
          <button
            className={`${styles["modal-button"]} ${styles["cancel-button"]}`}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`${styles["modal-button"]} ${styles["delete-recipe-button"]}`}
            onClick={handleConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
