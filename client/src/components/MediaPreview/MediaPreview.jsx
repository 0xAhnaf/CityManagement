import React from "react";
import "./MediaPreview.css";

const MediaPreview = ({ file, index, files, setFiles }) => {

  const removeFile = () => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
  };

  const url = URL.createObjectURL(file);

  return (

    <div className="media-card">

      <img src={url} alt="preview" />

      <div className="overlay">

        <button>
          <span className="material-symbols-outlined">
            visibility
          </span>
        </button>

        <button onClick={removeFile}>
          <span className="material-symbols-outlined">
            delete
          </span>
        </button>

      </div>

      <div className="filename">
        {file.name}
      </div>

    </div>

  );
};

export default MediaPreview;