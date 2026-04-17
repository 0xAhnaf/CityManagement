import React from "react";
import "./CategoryOption.css";

const CategoryOption = ({ data, selected, setCategory }) => {

  const isActive = selected === data.title;

  return (
    <label
      className={`category-option ${isActive ? "active" : ""}`}
      onClick={() => setCategory(data.title)}
    >

      <div className="option-left">

        <div className="option-icon">
          <span className="material-symbols-outlined">
            {data.icon}
          </span>
        </div>

        <div>
          <h3>{data.title}</h3>
          <p>{data.desc}</p>
        </div>

      </div>


      <div className={`radio ${isActive ? "checked" : ""}`}>
        <div className="dot"></div>
      </div>

    </label>
  );
};

export default CategoryOption;