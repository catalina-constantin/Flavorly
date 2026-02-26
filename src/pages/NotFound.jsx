import React from "react";
import { useNavigate } from "react-router-dom";
import MilkAnimation from "../components/common/MilkAnimation";
import styles from "../styles/pages/NotFound.module.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles["container"]}>
      <MilkAnimation />
      <div className={styles["text-container"]}>
        <h1>Oops...</h1>
        <h1> We have a missing ingredient!</h1>
        <p>
          Every great dish needs a secret ingredient, but this page seems to be
          missing entirely. Don't let your hunger wait... let's find something
          else to cook.
        </p>
        <button onClick={() => navigate("/")} className={styles["home-button"]}>
          Browse new recipes
        </button>
      </div>
    </div>
  );
}

export default NotFound;
