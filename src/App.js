import React, { useEffect, useState } from "react";
import Upload from "./components/Upload";
import Editor from "./components/Editor";
import Display from "./components/Display";
import "./index.css";
import axios from "axios";


function App() {
  const [images, setImages] = useState(() => {
    const saved = localStorage.getItem("gallery");
    return saved ? JSON.parse(saved) : [];
  });
  const [currentImage, setCurrentImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const handleUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "imgmanager"); // your preset
  formData.append("folder", "gallery"); // optional folder

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/drsqx7pfr/image/upload",
      formData
    );

    const uploadedImage = {
      id: res.data.asset_id,
      url: res.data.secure_url,
      createdAt: Date.now(),
    };

    setCurrentImage(uploadedImage);
  } catch (err) {
    console.error("Upload error:", err);
  }
};


  useEffect(() => {
    const savedImages = JSON.parse(localStorage.getItem("gallery"));
    if (savedImages && Array.isArray(savedImages)) {
      setImages(savedImages);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("gallery", JSON.stringify(images));
  }, [images]);

  const handleSave = (editedImage) => {
    if (selectedImageIndex !== null) {
      const updatedImages = [...images];
      updatedImages[selectedImageIndex] = editedImage;
      setImages(updatedImages);
    } else {
      setImages([...images, editedImage]);
    }
    setCurrentImage(null);
    setSelectedImageIndex(null);
  };

  const handleEdit = (image) => {
    const index = images.findIndex((img) => img.id === image.id);
    setCurrentImage(image);
    setSelectedImageIndex(index);
  };

  const handleClearGallery = () => {
    if (window.confirm("Are you sure you want to clear the gallery?")) {
      setImages([]);
      localStorage.removeItem("gallery");
      // Optionally: delete from Firebase too
    }
  };

  return (
    <div className="image-manager">
      <Upload onUpload={handleUpload} onClear={handleClearGallery} />
      <Editor
        image={currentImage}
        save={handleSave}
        onClose={() => setCurrentImage(null)}
        onReplace={() => document.getElementById("file-input").click()}
      />
      <Display images={images} onEdit={handleEdit} />
    </div>
  );
}

export default App;
