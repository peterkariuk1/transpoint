import "../styles/footer.css";
import fbIcon from "../assets/facebookicon.png";
import wappIcon from "../assets/wappicon.png";
import linkedinIcon from "../assets/linkicon.png";
import ytIcon from "../assets/yticon.png";
import igIcon from "../assets/igicon.png";
import listing1 from "../assets/seaside.jpg";
import listing2 from "../assets/bungalow.jpg";
import listing3 from "../assets/apartment.jpg";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-section company-info">
          <h4>Transpoint Ltd</h4>
          <p>🏢 To be provided, e.g Westlands</p>
          <p>📞 +254 711 111 111</p>
          <p>📧 info@transpoint.com</p>
          <p>🖥 www.transpoint.com</p>
        </div>

        <div className="footer-section quick-links">
          <h4>Quick Links</h4>
          <p>Apartment for Rent in Nairobi</p>
          <p>Apartment for Sale in Nairobi</p>
          <p>House for Rent in Nairobi</p>
          <p>House for Sale in Nairobi</p>
          <p>Office for Rent in Nairobi</p>
          <p>Warehouse for Rent in Nairobi</p>
        </div>

        <div className="footer-section social">
          <h4>Follow us on Social Media</h4>
          <p>
            Don’t miss out on the hottest listings and valuable real estate
            insights! Join us today and be in the know!
          </p>
          <div className="social-icons">
            <img src={fbIcon} alt="Facebook" />
            <img src={wappIcon} alt="Whatsapp" />
            <img src={linkedinIcon} alt="LinkedIn" />
            <img src={ytIcon} alt="YouTube" />
            <img src={igIcon} alt="Instagram" />
          </div>
        </div>

        <div className="footer-section listings">
          <h4>Latest Listing</h4>
          <div className="listing">
            <img src={listing1} alt="Listing 1" />
            <div>
              <p>Elite Living in Kyuna: Discover Unm...</p>
              <strong>From KES 86,500,000</strong>
            </div>
          </div>
          <div className="listing">
            <img src={listing2} alt="Listing 2" />
            <div>
              <p>Upcoming high-yielding modern 2,3 &...</p>
              <strong>Price on Application</strong>
            </div>
          </div>
          <div className="listing">
            <img src={listing3} alt="Listing 3" />
            <div>
              <p>Exclusive Penthouse For Sale In A P...</p>
              <strong>KES 98,500,000</strong>
            </div>
          </div>
        </div>
      </footer>
      <div className="rights-section">
        <p> Copyright All Rights Reserved 2025</p>
        <p>Privacy Policy</p>
        <p>Terms of Use</p>
      </div>
    </>
  );
};

export default Footer;
