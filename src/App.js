import React, { useEffect, useState } from "react";
import Upload from "./components/Upload";
import Editor from "./components/Editor";
import Display from "./components/Display";
import "./index.css"

function App() {

  const [images, setImages] = useState(() => {
    const saved = localStorage.getItem("gallery");
    return saved ? JSON.parse(saved) : [];
  });
  const [currentImage, setCurrentImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // Handle new image upload and open editor
  const handleUpload = (image) => {
    setCurrentImage(image);
  };

  useEffect (() =>{
    const savedImages = JSON.parse(localStorage.getItem("gallery"));
    console.log("Loaded from localStorage:", savedImages);
    if (savedImages && Array.isArray(savedImages)) {
      setImages(savedImages);
    }
  },[]);

  useEffect(() => {
    console.log("Saving to localStorage:", images);
    localStorage.setItem("gallery", JSON.stringify(images));
  }, [images]);
  
  // Save edited image to gallery
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

  const handleEdit = (image) =>{
    const index = images.indexOf(image);
    setCurrentImage(image);
    setSelectedImageIndex(index);
  }

  const handleClearGallery = () => {
    if (window.confirm("Are you sure you want to clear the gallery")){
      setImages([]);
      localStorage.removeItem("gallery");
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
      <Display images={images}  onEdit={handleEdit} />
    </div>
  );
}

export default App;
