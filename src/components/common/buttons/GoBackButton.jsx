import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import styles from "../../../styles/buttons/GoBackButton.module.css";

const GoBackButton = () => {
  const navigate = useNavigate();

  return (
    <button className={styles["go-back-button"]} onClick={() => navigate(-1)}>
      <ArrowLeft size={18} />
      <span>Go Back</span>
    </button>
  );
};

export default GoBackButton;
