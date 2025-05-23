import logoImage from "../assets/transpoint-logo.png";
import '../styles/Header.css'

const Header = () => {
  return (
    <nav>
      <div className="left">
        <img src={logoImage} />
      </div>
      <div className="right">
        <p>Sell Property</p>
        <p>Rent Property</p>
        <p>Other Services</p>
        <p>Login</p>
        <button>Sign Up</button>
      </div>
    </nav>
  );
};

export default Header;
