import React, { useState } from "react";
import Upload from "./components/Upload";
import Editor from "./components/Editor";
import Display from "./components/Display";
import "./index.css"

function App() {

  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // Handle new image upload and open editor
  const handleUpload = (image) => {
    setCurrentImage(image);
  };

  // Save edited image to gallery
  const handleSave = (editedImage) => {
    if (selectedImageIndex !== null) {
      const updatedImages = [...images];
      updatedImages[selectedImageIndex] = editedImage;
      setImages(updatedImages);
      setSelectedImageIndex(null);
    } else {
      setImages([...images, editedImage]);
    }
    setCurrentImage(null);

  };

  const handleEdit = (image , index) =>{
    setCurrentImage(image);
    setSelectedImageIndex(index);
  }

  

  return (
    <div className="image-manager">
      <Upload onUpload={handleUpload} />
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
