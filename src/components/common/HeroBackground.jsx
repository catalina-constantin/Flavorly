import React from "react";
import styles from "../../styles/pages/Home.module.css";

const HeroBackground = ({ src, alt }) => (
  <div className={styles["hero-image-wrapper"]}>
    <img src={src} alt={alt} className={styles["hero-image"]} />
    <div className={styles["hero-overlay"]}></div>
  </div>
);

export default HeroBackground;
