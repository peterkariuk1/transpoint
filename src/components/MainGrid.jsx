import { useState } from "react";
import "../styles/main-grid.css";
import guestIcon from "../assets/guest-icon.png";
import houseIcon from "../assets/house-icon.png";
import hotelicon from "../assets/hotel-icon.png";
import apartmentIcon from "../assets/apartment-icon.png";
import landIcon from "../assets/land-icon.png";
const MainGrid = () => {
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [selected, setSelected] = useState([]);

  const propertyTypes = [
    { name: "House", icon: houseIcon },
    { name: "Apartment", icon: apartmentIcon },
    { name: "Guesthouse", icon: guestIcon },
    { name: "Hotel", icon: hotelicon },
    { name: "Land", icon: landIcon },
  ];
  const amenityList = [
    "Wifi",
    "Washer",
    "Air Conditioner",
    "Kitchen",
    "Dryer",
    "Heating",
    "Dedicated Workspace",
    "TV",
    "Iron",
  ];

  const toggleAmenity = (amenity) => {
    setSelected((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };
  return (
    <div className="main-grid-container">
      <h2> Explore Kenya’s Finest Property – Handpicked for Your Lifestyle</h2>
      <h4>Property Type</h4>
      <div className="filters-section">
        <div className="property-type-container">
          {propertyTypes.map((type, i) => (
            <div
              key={i}
              className={`property-card ${
                selected === type.name ? "selected" : ""
              }`}
              onClick={() => setSelected(type.name)}
            >
              <img src={type.icon} alt={type.name} className="property-icon" />
              <p>{type.name}</p>
            </div>
          ))}
        </div>
        <h4>Amenities</h4>
        <div className="amenities-container">
          {amenityList.map((amenity, i) => (
            <div
              key={i}
              className={`pill ${selected.includes(amenity) ? "selected" : ""}`}
              onClick={() => toggleAmenity(amenity)}
            >
              {selected.includes(amenity) && <span className="tick">✔</span>}
              {amenity}
            </div>
          ))}
        </div>
        <p
          className="show-more-link"
          onClick={() => setShowMoreFilters(!showMoreFilters)}
        >
          {showMoreFilters ? "Show less ▲" : "Show more ▼"}
        </p>
         {showMoreFilters && (
    <div className="more-filters">
      <div className="filter-group">
        <label>Price Range:</label>
        <input type="range" min="0" max="1000" />
      </div>
      <div className="filter-group">
        <label>Location:</label>
        <input type="text" placeholder="Enter city or neighborhood" />
      </div>
    </div>
  )}
      </div>
    </div>
  );
};

export default MainGrid;
