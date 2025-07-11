import React, { useEffect, useState } from "react";
import Upload from "./components/Upload";
import Editor from "./components/Editor";
import Display from "./components/Display";
import "./index.css";

import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function App() {
  const [images, setImages] = useState(() => {
    const saved = localStorage.getItem("gallery");
    return saved ? JSON.parse(saved) : [];
  });
  const [currentImage, setCurrentImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // ✅ Upload image to Firebase
  const handleUpload = async (file) => {
  const id = crypto.randomUUID();
  const storageRef = ref(storage, `gallery/${id}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);

  setCurrentImage({ id, url: downloadURL, createdAt: Date.now() });
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
