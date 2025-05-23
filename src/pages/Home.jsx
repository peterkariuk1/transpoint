import "../styles/Home.css";
import heroVideo from "../assets/herovideo.mp4";
import searchIcon from "../assets/search1.png";
import arrowDown from "../assets/arrowdown.png";
import Header from "../components/Header";
const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <div className="video-container">
        <video
          className="hero-video"
          src={heroVideo}
          autoPlay
          muted
          loop
        ></video>
        <div className="video-overlay"></div>
        <div className="hero-title-container">
          <h1>
            Find Your <span> Perfect Home</span>— Fast and Hassle-Free
          </h1>
          <p>
            Verified listings with photos, videos, and simple filters — buy,
            rent, or sell with ease.
          </p>
        </div>
        <div className="filter-overlay-container">
          <div className="filter-type-container">
            <p>Location</p>

            <img src={arrowDown} />
          </div>
          <div className="filter-type-container">
            <p>Type</p>

            <img src={arrowDown} />
          </div>
          <div className="filter-type-container">
            <p>Price</p>

            <img src={arrowDown} />
          </div>
          <div className="filter-type-container">
            <p>Rooms</p>
            <img src={arrowDown} />
          </div>
          <div className="search--container">
            <img src={searchIcon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
