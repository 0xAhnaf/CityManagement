import React, { useState } from "react";

import Step1Category from "./Step1Category";
import Step2Location from "./Step2Location";
import Step3Evidence from "./Step3Evidence";
import Step4Final from "./Step4Final";
// import ProgressBar from "./ProgressBar";

const ComplaintWizard = () => {

  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderStep = () => {

    switch(step){

      case 1:
        return <Step1Category nextStep={nextStep}/>

      case 2:
        return <Step2Location nextStep={nextStep} prevStep={prevStep}/>

      case 3:
        return <Step3Evidence nextStep={nextStep} prevStep={prevStep}/>

      case 4:
        return <Step4Final prevStep={prevStep}/>

      default:
        return <Step1Category/>

    }

  };

  return (

    <div>

      {/* <ProgressBar step={step} /> */}

      {renderStep()}

    </div>

  );

};

export default ComplaintWizard;