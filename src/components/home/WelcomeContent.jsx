import React from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import styles from "../../styles/pages/Home.module.css";

const WelcomeContent = () => (
  <div className={styles["welcome-content"]}>
    <h2>Stop staring at the fridge!</h2>
    <p className={styles["tagline"]}>
      The fridge light won't reveal a 5-course meal. Whether you're a pro or an
      origami "cheese folder," we've got you covered.
    </p>
    <div className={styles["button-group"]}>
      <Link to="/recipes" className={styles["primary-btn"]}>
        Find a tasty recipe
        <Search size={20} />
      </Link>
    </div>
  </div>
);

export default WelcomeContent;
