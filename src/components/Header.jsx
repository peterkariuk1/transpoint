import { useState } from "react";
import logoImage from "../assets/transpoint-logo.png";
import "../styles/Header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className="header-nav">
      <div className="left">
        <img src={logoImage} alt="Transpoint Logo" />
      </div>

      <div className="right desktop-links">
        <p>Contact Us</p>
        <p>Login</p>
        <button>Sign Up</button>
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
        <p>Login</p>
        <button>Sign Up</button>
        <div className="brand-message">
          <p>Connecting people to homes with speed, simplicity, and trust.</p>
        </div>
      </div>

      {isOpen && <div className="overlay-backdrop" onClick={toggleMenu}></div>}
    </nav>
  );
};

export default Header;
