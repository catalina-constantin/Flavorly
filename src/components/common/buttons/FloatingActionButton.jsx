import React from "react";
import { Pencil, X } from "lucide-react";
import styles from "../../../styles/buttons/FloatingActionButton.module.css";

const FloatingActionButton = ({ onClick, isDeleteMode }) => {
  return (
    <button
      className={`${styles["fab-button"]} ${isDeleteMode ? styles["delete-mode"] : ""}`}
      onClick={onClick}
      aria-label={isDeleteMode ? "Cancel Delete" : "Manage Recipes"}
    >
      {isDeleteMode ? <X size={28} /> : <Pencil size={28} />}
    </button>
  );
};

export default FloatingActionButton;
