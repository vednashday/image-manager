import React, { useRef } from "react";
import { Drawer, Button } from "@mui/material";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import axios from "axios";
import "../stylesheets/Editor.css";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/drsqx7pfr/image/upload";
const UPLOAD_PRESET = "imgmanager"; 

const Editor = ({ image, onReplace, onClose, save }) => {
  const cropperRef = useRef(null);
  const fileInputRef = useRef(null);

  const applyCrop = async () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const canvas = cropper.getCroppedCanvas();
      if (canvas) {
        canvas.toBlob(async (blob) => {
          const formData = new FormData();
          formData.append("file", blob);
          formData.append("upload_preset", UPLOAD_PRESET);
          formData.append("folder", "gallery");

          try {
            const res = await axios.post(CLOUDINARY_URL, formData);
            save({
              id: res.data.asset_id,
              url: res.data.secure_url,
              createdAt: Date.now(),
            });
          } catch (err) {
            console.error("Crop upload failed:", err);
          }
        }, "image/png");
      }
    }
  };

  const rotateImage = () => {
    const cropper = cropperRef.current?.cropper;
    cropper.rotate(90);
  };

  const flipHorizontal = () => {
    const cropper = cropperRef.current?.cropper;
    const scaleX = cropper.getData().scaleX || 1;
    cropper.scaleX(scaleX * -1);
  };

  const flipVertical = () => {
    const cropper = cropperRef.current?.cropper;
    const scaleY = cropper.getData().scaleY || 1;
    cropper.scaleY(scaleY * -1);
  };

  const handleReplace = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("folder", "gallery");

      try {
        const res = await axios.post(CLOUDINARY_URL, formData);
        save({
          id: res.data.asset_id,
          url: res.data.secure_url,
          createdAt: Date.now(),
        });
      } catch (err) {
        console.error("Replace upload failed:", err);
      }
    }
  };

  return (
    <Drawer anchor="right" open={!!image} onClose={onClose}>
      <div className="editor" style={{ padding: "20px", textAlign: "center" }}>
        {image ? (
          <Cropper
            ref={cropperRef}
            src={image.url}
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
