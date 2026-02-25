import React from "react";
import { BookOpen } from "lucide-react";
import "../styles/InstructionSteps.css";

const InstructionSteps = ({ instructions }) => {
  const steps = instructions
    .split(/\s*(?=\d+\.)/)
    .filter((step) => step.trim());

  return (
    <section className="instructions-card">
      <h2>
        <BookOpen size={24} className="icon-orange" />
        Instructions
      </h2>
      <div className="instructions-content">
        {steps.map((step, i) => {
          const match = step.trim().match(/^(\d+)\.\s*(.*)$/);
          const number = match ? match[1] : String(i + 1);
          const text = match ? match[2] : step.trim();

          return (
            <div key={`${number}-${i}`} className="instruction-step">
              <span className="step-number">{number}</span>
              <p>{text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default InstructionSteps;
