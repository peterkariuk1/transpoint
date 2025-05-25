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
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(800);
  const [listingType, setListingType] = useState("Rent");
  const [location, setLocation] = useState("");

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
            {/* Min–Max Price Range */}
            <div className="filter-group">
              <label>Price Range (Ksh):</label>
              <div className="price-sliders">
                <div>
                  <p className="max-min-text">Set minimum price:</p>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="50"
                    value={minPrice}
                    onChange={(e) => {
                      const newMin = Number(e.target.value);
                      if (newMin <= maxPrice) setMinPrice(newMin);
                    }}
                  />
                </div>
                <div>
                  <p className="max-min-text">Set maximum price:</p>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="50"
                    value={maxPrice}
                    onChange={(e) => {
                      const newMax = Number(e.target.value);
                      if (newMax >= minPrice) setMaxPrice(newMax);
                    }}
                  />
                </div>
              </div>
              <p className="price-display">
                Ksh {minPrice}K – {maxPrice}K
              </p>
            </div>

            {/* Rent or Sale Toggle */}
            <div className="filter-group">
              <label>Property Type:</label>
              <div className="radio-toggle">
                <label>
                  <input
                    type="radio"
                    value="Rent"
                    checked={listingType === "Rent"}
                    onChange={() => setListingType("Rent")}
                  />
                  Rent
                </label>
                <label>
                  <input
                    type="radio"
                    value="Sale"
                    checked={listingType === "Sale"}
                    onChange={() => setListingType("Sale")}
                  />
                  Sale
                </label>
              </div>
            </div>

            {/* Location Input */}
            <div className="filter-group">
              <label>Location:</label>
              <input
                type="text"
                className="location-input"
                placeholder="e.g. Nairobi, Kilimani, Westlands"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainGrid;
