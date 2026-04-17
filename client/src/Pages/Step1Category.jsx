import React from "react";
import ComplaintForm from "../components/ComplaintForm/ComplaintForm";

const Step1Category = ({ nextStep }) => {
  return (
    <div className="page-bg">
      <ComplaintForm nextStep={nextStep} />
    </div>
  );
};

export default Step1Category;