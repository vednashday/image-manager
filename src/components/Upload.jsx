import React from "react";
import "../stylesheets/Upload.css";


const Upload = ({onUpload, onClear}) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            onUpload(reader.result);
          };
          reader.readAsDataURL(file);
        }

    };

    return(
    <div className="upload-container">
      <div className="upload-box">
        <input
          type="file"
          id="file-input"
          className="file-input"
          onChange={handleFileChange}
        />
        <label htmlFor="file-input" className="upload-button">
          <button variant="contained" onClick={() => document.getElementById("file-input").click()}>Add to Gallery</button>
          
        </label>
        <button onClick={onClear} className="clear-button">Clear Gallery</button>
      </div>
    </div>
    );
};

export default Upload;