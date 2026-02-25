import React from "react";
import { Pencil, X } from "lucide-react";
import "../styles/FloatingActionButton.css";

const FloatingActionButton = ({ onClick, isDeleteMode }) => {
  return (
    <button
      className={`fab-button ${isDeleteMode ? "delete-mode" : ""}`}
      onClick={onClick}
      aria-label={isDeleteMode ? "Cancel Delete" : "Manage Recipes"}
    >
      {isDeleteMode ? <X size={28} /> : <Pencil size={28} />}
    </button>
  );
};

export default FloatingActionButton;
