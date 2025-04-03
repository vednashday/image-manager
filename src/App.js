import React, { useState } from "react";
import Upload from "./components/Upload";
import Editor from "./components/Editor";
import Display from "./components/Display";
import "./index.css"

function App() {

  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);

  // Handle new image upload and open editor
  const handleUpload = (image) => {
    setCurrentImage(image);
  };

  // Save edited image to gallery
  const handleSave = (editedImage) => {
    setImages([...images, editedImage]);
    setCurrentImage(null); // Close editor after saving
  };

  const handleEdit = (image) =>{
    setCurrentImage(image);
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
      <Display images={images} onEdit={handleEdit} />
    </div>
  );
}

export default App;
