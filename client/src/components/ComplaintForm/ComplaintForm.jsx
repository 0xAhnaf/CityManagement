import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ComplaintForm.css";
import CategoryOption from "../CategoryOption/CategoryOption";
import { useComplaintContext } from "../../contexts/ComplaintContext";

const ComplaintForm = ({ nextStep }) => {
  const [category, setCategory] = useState("Infrastructure");
  const navigate = useNavigate();
  const { complaint, setComplaint } = useComplaintContext();
  const handleNext = () => {
    setComplaint((prev) => {
      return {
        ...prev,
        category: category,
      };
    });
    nextStep();
    // console.log(complaint);
  };

  const categories = [
    {
      title: "Infrastructure",
      desc: "Roads, bridges, and public buildings",
      icon: "construction",
    },
    {
      title: "Sanitation",
      desc: "Waste management and sewage",
      icon: "delete_sweep",
    },
    {
      title: "Public Safety",
      desc: "Police, fire, and emergency services",
      icon: "local_police",
    },
    {
      title: "Environment",
      desc: "Parks, pollution, and wildlife",
      icon: "eco",
    },
    {
      title: "Other",
      desc: "Any other public concern",
      icon: "more_horiz",
    },
  ];

  return (
    <div className="form-container">
      <header className="form-header">
        <div className="header-left">
          <div className="icon-box">
            <span className="material-symbols-outlined">report_problem</span>
          </div>

          <h2>Submit Complaint</h2>
        </div>

        <button
          onClick={() => {
            navigate("/");
          }}
          className="close-btn"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </header>

      <div className="form-body">
        <div className="progress-section">
          <div className="progress-header">
            <div>
              <span className="step">Step 1 of 4</span>
              <h1>What is the issue about?</h1>
            </div>

            <span className="percent">25% Complete</span>
          </div>

          <div className="progress-bar">
            <div className="progress-fill-25"></div>
          </div>
        </div>

        <p className="description">
          Select a category that best describes your concern.
        </p>

        <div className="category-list">
          {categories.map((item) => (
            <CategoryOption
              key={item.title}
              data={item}
              selected={category}
              setCategory={setCategory}
            />
          ))}
        </div>

        <div className="form-footer">
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="prev"
          >
            Cancel
          </button>

          <button onClick={handleNext} className="next">
            Next Step →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintForm;
