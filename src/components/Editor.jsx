import React, { useRef } from "react";
import { Drawer, Button } from "@mui/material";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "../stylesheets/Editor.css"

const Editor = ({ image, onReplace, onClose, save }) => {
  const cropperRef = useRef(null);
  const fileInputRef = useRef(null);


  // Function to crop the image and save it
  const applyCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas();
      if (croppedCanvas) {
        save(croppedCanvas.toDataURL());
      }
    }
  };

  // Rotate Image by 90 Degrees
  const rotateImage = () => {
    const cropper = cropperRef.current?.cropper;
    cropper.rotate(90);
  };

  // Flip Image Horizontally
  const flipHorizontal = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const currentScaleX = cropper.getData().scaleX || 1;
      cropper.scaleX(currentScaleX * -1);
    }
  };

  // Flip Image Vertically
  const flipVertical = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const currentScaleY = cropper.getData().scaleY || 1;
      cropper.scaleY(currentScaleY * -1);
    }
  };

  const handleReplace = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend= () => {
        save(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <Drawer anchor="right" open={!!image} onClose={onClose}>
      <div className="editor" style={{ padding: "20px", textAlign: "center" }}>
        {image ? (
          <Cropper
            ref={cropperRef}
            src={image}
            style={{ height: 400, width: "100%" }}
            initialAspectRatio={1}
            
            guides={true}
            viewMode={1}
            background={false}
            autoCropArea={1}
            movable={true}
            rotatable={true}
            scalable={true}
            cropBoxResizable={true}
          />
        ) : (
          <p>No Image Selected</p>
        )}

        <div className="edit-buttons" style={{ marginTop: "10px" }}>
          <Button variant="contained" onClick={rotateImage} style={{ margin: "5px" }}>
            Rotate
          </Button>
          <Button variant="contained" onClick={flipHorizontal} style={{ margin: "5px" }}>
            Flip Horizontally
          </Button>
          <Button variant="contained" onClick={flipVertical} style={{ margin: "5px" }}>
            Flip Vertically
          </Button>
          <Button variant="contained" onClick={applyCrop} style={{ margin: "5px" }}>
            Crop & Save
          </Button>
          <Button variant="contained" onClick={onClose} style={{ margin: "5px" }}>
            Close
          </Button>
          <Button variant="contained" onClick={() => fileInputRef.current.click()} style={{ margin: "5px" }}>
            Replace
          </Button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleReplace}
          />
        </div>
      </div>
    </Drawer>
  );
};

export default Editor;
