import React, { useState } from "react";
import StepHeader from "../components/StepHeader/StepHeader";
import LocationMap from "../components/LocationMap/LocationMap";
import "./Step2Location.css";
import { useComplaintContext } from "../contexts/ComplaintContext";

const Step2Location = ({ nextStep, prevStep, onLocationChange }) => {
  const [location, setLocation] = useState(null);
  const { setComplaint } = useComplaintContext();

  const handleLocationChange = (loc) => {
    setLocation(loc);
    if (onLocationChange) onLocationChange(loc);
  };

  const handleNext = () => {
    if (!location) {
      alert("Please select a location on the map before continuing.");
      return;
    }
    setComplaint((prev) =>{
      const updated = {
        ...prev,
        location
      }
      console.log(updated);
      return updated;
    });
    nextStep();
  };

  return (
    <div className="page">
      <div className="complaint-container complaint-glass complaint-card">

        <div className="progress-section">
          <div className="progress-top">
            <div>
              <p className="step">Step 2 of 4</p>
              <h1>Location Selection</h1>
            </div>
            <p className="percent">50% Complete</p>
          </div>
          <div className="progress-bar">
            <div className="progress-fill-50"></div>
          </div>
        </div>

        <LocationMap onLocationChange={handleLocationChange} />

        <div className="buttons">
          <button onClick={prevStep} className="prev">
            ← Previous Step
          </button>
          <button onClick={handleNext} className="next">
            Next Step →
          </button>
        </div>

      </div>
    </div>
  );
};

export default Step2Location;