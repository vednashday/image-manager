import React, { useRef } from "react";
import { Drawer, Button } from "@mui/material";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "../stylesheets/Editor.css";

import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Editor = ({ image, onReplace, onClose, save }) => {
  const cropperRef = useRef(null);
  const fileInputRef = useRef(null);

  const applyCrop = async () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas();
      if (croppedCanvas) {
        // ✅ Convert canvas to Blob
        croppedCanvas.toBlob(async (blob) => {
          const id = crypto.randomUUID();
          const storageRef = ref(storage, `gallery/${id}`);
          await uploadBytes(storageRef, blob);
          const url = await getDownloadURL(storageRef);

          save({ id, url, createdAt: Date.now() });
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
    if (cropper) {
      const currentScaleX = cropper.getData().scaleX || 1;
      cropper.scaleX(currentScaleX * -1);
    }
  };

  const flipVertical = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const currentScaleY = cropper.getData().scaleY || 1;
      cropper.scaleY(currentScaleY * -1);
    }
  };

  const handleReplace = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const id = crypto.randomUUID();
      const storageRef = ref(storage, `gallery/${id}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      save({ id, url, createdAt: Date.now() });
    }
  };

  return (
    <Drawer anchor="right" open={!!image} onClose={onClose}>
      <div className="editor" style={{ padding: "20px", textAlign: "center" }}>
        {image ? (
          <Cropper
            ref={cropperRef}
            src={image.url || image} // supports both string or object
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
