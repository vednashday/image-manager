import React from "react";
import { Masonry } from '@mui/lab';
import "../stylesheets/Display.css"
const Display = ({ images ,onEdit}) => {
    return (
        <div className="container">
        <Masonry columns={4} spacing={2}>
            {images.map((img, index) => (
                <img key={index} src={img} alt={`Edited ${index}`} onClick={()=> onEdit(img)} className="disp-img" />
            ))}
        </Masonry>
        </div>
    )
}
export default Display;