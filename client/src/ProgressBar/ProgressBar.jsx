import React from "react";
import "./ProgressBar.css";
function ProgressBar({ value, color }) {
  const safeValue = Math.min(100, Math.max(0, value));
  return (
    <div className="progress-wrapper">
      <div
        className={`progress-bar1 ${color}`}
        style={{ width: `${safeValue}%` }}
      />
    </div>
  );
}

export default ProgressBar;
