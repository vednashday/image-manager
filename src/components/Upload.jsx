import React from "react";
import "../stylesheets/Upload.css";

const Upload = ({ onUpload, onClear }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onUpload(file); // pass File object directly to App.js
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-box">
        <input
          type="file"
          id="file-input"
          className="file-input"
          accept="image/*"
          onChange={handleFileChange}
        />
        <label htmlFor="file-input" className="upload-button">
          Add to Gallery
        </label>
        <button onClick={onClear} className="clear-button">Clear Gallery</button>
      </div>
    </div>
  );
};

export default Upload;
