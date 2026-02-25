import React from "react";
import { AlertTriangle } from "lucide-react";
import "../styles/ConfirmModal.css";

const ConfirmModal = ({ isOpen, onClose, onConfirm, recipeName }) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon">
          <AlertTriangle size={48} />
        </div>
        <h2 className="modal-title">Delete Recipe?</h2>
        <p className="modal-message">
          Are you sure you want to delete "{recipeName}"?
        </p>
        <p className="modal-warning">
          This action is permanent and cannot be undone.
        </p>
        <div className="modal-actions">
          <button className="modal-button cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button
            className="modal-button delete-recipe-button"
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
