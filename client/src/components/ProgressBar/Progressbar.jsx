import React from "react";

const ProgressBar = ({ step }) => {

  const percent = (step / 4) * 100;

  return (

    <div style={{width:"600px",margin:"20px auto"}}>

      <p>Step {step} of 4</p>

      <div style={{
        height:"10px",
        background:"#ddd",
        borderRadius:"8px"
      }}>

        <div
          style={{
            width:`${percent}%`,
            height:"100%",
            background:"#306ee8",
            borderRadius:"8px"
          }}
        />

      </div>

    </div>

  );

};

export default ProgressBar;