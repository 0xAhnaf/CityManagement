import React from "react";
import "./UploadBox.css";

const UploadBox = ({ files, setFiles }) => {

  const handleFiles = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles([...files, ...newFiles]);
  };

  return (

    <div className="upload-box">

      <span className="material-symbols-outlined upload-icon">
        cloud_upload
      </span>

      <h3>Drag and drop files here</h3>

      <p>Supports JPG, PNG, MP4 (max 25MB)</p>

      <input
        type="file"
        multiple
        onChange={handleFiles}
        id="fileInput"
        hidden
      />

      <label htmlFor="fileInput" className="upload-btn">
        Browse Files
      </label>

    </div>

  );
};

export default UploadBox;