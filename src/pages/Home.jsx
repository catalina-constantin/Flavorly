import React from "react";
import { ChevronDown } from "lucide-react";
import { useRecipes } from "../hooks/useRecipes";
import HeroBackground from "../components/common/HeroBackground";
import WelcomeContent from "../components/home/WelcomeContent";
import FloatingCarousel from "../components/home/FloatingCarousel";
import AppFeatures from "../components/home/AppFeatures";
import styles from "../styles/pages/Home.module.css";

function Home() {
  const { recipes, loading } = useRecipes();

  return (
    <div className={styles["home-container"]}>
      <section className={styles["hero-section"]}>
        <HeroBackground src="/landing-page.jpg" alt="Delicious cooking" />

        <WelcomeContent />

        <div
          className={styles["scroll-indicator"]}
          onClick={() => {
            const nextSection = document.querySelector(
              `.${styles["transition-separator"]}`,
            );
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
          style={{ cursor: "pointer" }}
        >
          <span>Discover who we are</span>
          <ChevronDown size={32} className={styles["bounce"]} />
        </div>

        <FloatingCarousel recipes={recipes} loading={loading} />
      </section>

      <div className={styles["transition-separator"]}></div>

      <AppFeatures />

      <div className={styles["transition-separator"]}></div>
    </div>
  );
}

export default Home;
