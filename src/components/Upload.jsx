import React from "react";
import "../stylesheets/Upload.css";
import AddIcon from "@mui/icons-material/Add";


const Upload = ({onUpload}) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = () => onUpload(reader.result);
            reader.readAsDataURL(file);
        }

    };
    const handleButtonClick = () => {
        document.getElementById("file-input").click();
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
          <button variant="contained" startIcon={<AddIcon />} onClick={handleButtonClick}>Add</button>
        </label>
      </div>
    </div>
    );
};

export default Upload;