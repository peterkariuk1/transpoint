import "../styles/Home.css";
import heroVideo from "../assets/herovideo.mp4";
import Header from "../components/Header";
const Home = () => {

  return (
    <div className="home-page">
      <div className="video-container">
        <video
          className="hero-video"
          src={heroVideo}
          autoPlay
          muted
          loop
        ></video>
        <div className="video-overlay"></div>
      </div>
      <Header />
    </div>
  );
};

export default Home;
