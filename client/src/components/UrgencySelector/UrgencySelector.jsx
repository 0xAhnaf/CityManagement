import React from "react";
import "./UrgencySelector.css";

const options = [
  { label: "Standard", icon: "info" },
  { label: "Priority", icon: "priority_high" },
  { label: "Urgent", icon: "emergency_home" }
];

const UrgencySelector = ({ urgency, setUrgency }) => {

  return (

    <div className="section">

      <label>Urgency Level</label>

      <div className="urgency-grid">

        {options.map((option) => (

          <button
            key={option.label}
            className={
              urgency === option.label
                ? "urgency-card active"
                : "urgency-card"
            }
            onClick={() => setUrgency(option.label)}
          >

            <span>{option.label}</span>

            <span className="material-symbols-outlined">
              {option.icon}
            </span>

          </button>

        ))}

      </div>

    </div>
  );
};

export default UrgencySelector;