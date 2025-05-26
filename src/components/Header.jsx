import { useState } from "react";
import logoImage from "../assets/transpoint-logo.png";
import "../styles/Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className="header-nav">
      <div className="left">
        <Link to="/upload" style={{ textDecoration: "none" }}>
          <img src={logoImage} alt="Transpoint Logo" />
        </Link>
      </div>

      <div className="right desktop-links">
        <p>Contact Us</p>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <p>Login</p>
        </Link>
        <Link to="/signup" style={{ textDecoration: "none" }}>
          <button>Sign Up</button>
        </Link>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <button className="close-button" onClick={toggleMenu}>
          ×
        </button>
        <p>Contact Us</p>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <p>Login</p>
        </Link>
        <Link to="/signup" style={{ textDecoration: "none" }}>
          <button>Sign Up</button>
        </Link>
        <div className="brand-message">
          <p>Connecting people to homes with speed, simplicity, and trust.</p>
        </div>
      </div>

      {isOpen && <div className="overlay-backdrop" onClick={toggleMenu}></div>}
    </nav>
  );
};

export default Header;
