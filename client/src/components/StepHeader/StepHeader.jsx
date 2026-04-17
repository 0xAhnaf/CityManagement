import React from "react";
import "./StepHeader.css";

const StepHeader = () => {
  return (
    <header className="header">

      <div className="header-left">

        <div className="logo-box">
          <span className="material-symbols-outlined">
            report_problem
          </span>
        </div>

        <h2>Submit Complaint</h2>

      </div>

      <button className="close-btn">
        <span className="material-symbols-outlined">close</span>
      </button>

    </header>
  );
};

export default StepHeader;