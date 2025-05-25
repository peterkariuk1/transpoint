import { useState } from "react";
import "../styles/Property.css";
import Image from "../assets/auth.jpg";

function Property() {
  // Images array - replace with your actual property images later
  const images = [Image, Image, Image, Image, Image, Image];
  
  // State to track the currently selected image
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="property-page-wrapper">
      <div className="property-container">
        <div className="images">
          <div className="preview">
            <img src={images[selectedImage]} alt="Property preview" />
          </div>
          <div className="thumbnails">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={selectedImage === index ? "active" : ""}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="property-details">
        <h1>Property Title</h1>
        <p>Property description goes here. This is a detailed description of the property.</p>
        <div className="property-info">
            <div className="info-item">
                <h2>Price</h2>
                <p>$500,000</p>
            </div>
            <div className="info-item">
                <h2>Location</h2>
                <p>123 Main St, City, Country</p>
            </div>
            <div className="info-item">
                <h2>Size</h2>
                <p>2000 sq ft</p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Property;