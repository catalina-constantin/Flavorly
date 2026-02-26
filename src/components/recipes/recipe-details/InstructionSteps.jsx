import React from "react";
import { BookOpen } from "lucide-react";
import styles from "../../../styles/recipes/details/InstructionSteps.module.css";

const InstructionSteps = ({ instructions }) => {
  if (!instructions) {
    return null;
  }

  const steps = instructions
    .split(/\s*(?=\d+\.)/)
    .filter((step) => step.trim());

  return (
    <section className={styles["instructions-card"]}>
      <h2>
        <BookOpen size={24} className={styles["icon-orange"]} />
        Instructions
      </h2>
      <div className={styles["instructions-content"]}>
        {steps.map((step, i) => {
          const match = step.trim().match(/^(\d+)\.\s*(.*)$/);
          const number = match ? match[1] : String(i + 1);
          const text = match ? match[2] : step.trim();

          return (
            <div key={`${number}-${i}`} className={styles["instruction-step"]}>
              <span className={styles["step-number"]}>{number}</span>
              <p>{text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default InstructionSteps;
