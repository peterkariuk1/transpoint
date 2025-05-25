import { useState } from "react";
import "../styles/Property.css";
import Image from "../assets/auth.jpg";
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt } from "react-icons/fa";
import { BsArrowsFullscreen, BsChevronLeft, BsChevronRight } from "react-icons/bs";

function Property() {
  // Images array
  const images = [Image, Image, Image, Image, Image, Image];

  // State to track the currently selected image
  const [selectedImage, setSelectedImage] = useState(0);

  // Next image handler
  const nextImage = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Previous image handler
  const prevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="property-page">
      {/* Hero Section with Main Image */}
      <div className="property-hero">
        <div className="image-navigation">
          <button className="nav-button prev" onClick={prevImage}>
            <BsChevronLeft />
          </button>
          <button className="nav-button next" onClick={nextImage}>
            <BsChevronRight />
          </button>
        </div>
        <div className="main-image-container">
          <img
            src={images[selectedImage]}
            alt="Property view"
            className="main-image"
          />
        </div>
        <div className="image-counter">
          {selectedImage + 1} / {images.length}
        </div>
      </div>

      {/* Content Section */}
      <div className="property-content">
        <div className="property-content-inner">
          {/* Thumbnail Strip */}
          <div className="thumbnail-strip">
            {images.map((image, index) => (
              <div
                key={index}
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={image} alt={`View ${index + 1}`} />
              </div>
            ))}
          </div>

          {/* Property Information */}
          <div className="property-header">
            <div className="property-title-section">
              <h1 className="property-title">Luxury Villa in Downtown</h1>
              <div className="property-location">
                <FaMapMarkerAlt />
                <span>Kilimani, Nairobi</span>
              </div>
            </div>
            <div className="property-price">Ksh. 1,250,000</div>
          </div>

          {/* Key Features */}
          <div className="property-features">
            <div className="feature">
              <FaBed />
              <span className="feature-value">4</span>
              <span className="feature-label">Bedrooms</span>
            </div>
            <div className="feature">
              <FaBath />
              <span className="feature-value">3.5</span>
              <span className="feature-label">Bathrooms</span>
            </div>
            <div className="feature">
              <FaRulerCombined />
              <span className="feature-value">3,200</span>
              <span className="feature-label">Sq Ft</span>
            </div>
            <div className="feature">
              <BsArrowsFullscreen />
              <span className="feature-value">0.5</span>
              <span className="feature-label">Acres</span>
            </div>
          </div>

          {/* Property Description */}
          <div className="property-description">
            <h2>About This Property</h2>
            <p>
              This stunning property features modern architecture with panoramic city views, premium finishes, and resort-style amenities. Located in a prime neighborhood with easy access to shopping, dining, and entertainment.
            </p>
            <p>
              The open floor plan includes a gourmet kitchen with high-end appliances, spacious primary suite with luxury bath, and multiple outdoor living spaces. The property includes smart home technology, energy efficient systems, and a two-car garage.
            </p>
          </div>

          {/* Property Details */}
          <div className="property-details-section">
            <h2>Property Details</h2>
            <div className="details-grid">
              <div className="detail-item">
                <h3>Property Type</h3>
                <p>Single Family Home</p>
              </div>
              <div className="detail-item">
                <h3>Year Built</h3>
                <p>2020</p>
              </div>
              <div className="detail-item">
                <h3>Heating</h3>
                <p>Central, Gas</p>
              </div>
              <div className="detail-item">
                <h3>Cooling</h3>
                <p>Central Air</p>
              </div>
              <div className="detail-item">
                <h3>Parking</h3>
                <p>2 Car Garage</p>
              </div>
              <div className="detail-item">
                <h3>Lot Size</h3>
                <p>0.5 Acres</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="property-cta">
            <button className="cta-button primary">Schedule a Viewing</button>
            <button className="cta-button secondary">Contact Agent</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Property;