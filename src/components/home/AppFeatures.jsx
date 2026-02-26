import React from "react";
import { Filter, Clock, BookOpen } from "lucide-react";
import styles from "../../styles/pages/Home.module.css";

const AppFeatures = () => {
  const features = [
    {
      icon: <Filter size={40} />,
      title: "Smart Filtering",
      description:
        "Quickly find the perfect meal by browsing through your favorite categories, from breakfast to late-night snacks.",
    },
    {
      icon: <Clock size={40} />,
      title: "Quick Bites",
      description:
        "Find recipes that take less time to cook than it takes to decide what to watch on Netflix tonight.",
    },
    {
      icon: <BookOpen size={40} />,
      title: "Kitchen Secrets",
      description:
        "Crystal clear instructions so you can stop guessing and finally master those 'folded-in' cheese techniques.",
    },
  ];

  return (
    <section className={styles["features-section"]}>
      <div className={styles["features-header"]}>
        <span className={styles["features-subtitle"]}>Everything you need</span>
        <h2 className={styles["features-title"]}>
          Why choose <span>Flavorly?</span>
        </h2>
      </div>
      <div className={styles["features-grid"]}>
        {features.map((feature, index) => (
          <div key={index} className={styles["feature-card"]}>
            <div className={styles["feature-icon"]}>{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AppFeatures;
