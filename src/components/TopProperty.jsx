import "../styles/grids.css";
import arrowDown from "../assets/down.png";
import smartPhone from "../assets/smartphone.png";
import repairs from "../assets/repair.png";
import legal from "../assets/legal.png";
import van from "../assets/van.png";
import doodleLine from "../assets/underline.svg";
import { useRef } from "react";
import { topProperties } from "../assets/topProperties";
import { useEffect } from "react";
import gsap from "gsap";

const TopProperty = () => {
  useEffect(() => {
    const serviceCards = document.querySelectorAll(".services-container > div");

    serviceCards.forEach((card) => {
      const doodle = card.querySelector(".doodle-line");

      card.addEventListener("mouseenter", () => {
        gsap.fromTo(
          doodle,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.3, ease: "power2.out" }
        );
      });

      // Optional: Reset on mouse leave
      card.addEventListener("mouseleave", () => {
        gsap.set(doodle, { scaleX: 0 });
      });
    });

    // Optional cleanup
    return () => {
      serviceCards.forEach((card) => {
        card.replaceWith(card.cloneNode(true)); // quick cleanup of listeners
      });
    };
  }, []);
  const services = [
    {
      className: "service1",
      imgSRC: smartPhone,
      text: " Virtual Property Tours",
    },
    {
      className: "service2",
      imgSRC: repairs,
      text: " On-Demand Home Repairs & Maintenance",
    },
    {
      className: "service3",
      imgSRC: legal,
      text: " Legal & Documentation Support",
    },
    {
      className: "service4",
      imgSRC: van,
      text: "Pickup & Viewing Shuttle Services",
    },
  ];
  const scrollRef = useRef();

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const truncateDescription = (text, wordLimit = 11) => {
    const words = text.trim().split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };
  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `KSH. ${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `KSH. ${(price / 1000).toFixed(0)}k`;
    } else {
      return `KSH. ${price}`;
    }
  };

  return (
    <div className="top-property-container">
      <div className="top">
        <h3>Explore the best listings in the market today </h3>
        <div className="scroll-buttons">
          <div onClick={scrollLeft} className="left">
            <img src={arrowDown} />
          </div>
          <div onClick={scrollRight} className="right">
            <img src={arrowDown} />
          </div>
        </div>
      </div>
      <div ref={scrollRef} className="top-property-grid">
        {topProperties.map((property, i) => {
          return (
            <div key={i} className="grid-item">
              <div
                style={{ backgroundImage: `url(${property.imgSRC})` }}
                className="top"
              >
                <div className="price-type-overlay">
                  <p className="purchase-type">
                    {property.type === "For Sale" ? "Buy" : "Rent"}
                  </p>
                  <p className="property--price">
                    {formatPrice(property.price)}
                  </p>
                </div>
              </div>
              <div className="bottom">
                <p className="title">{property.name}</p>
                <p className="location">{property.location}</p>
                <p className="description">
                  {truncateDescription(property.description)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="why-us-container">
        <h2>Conveniences Of Our Services</h2>
        <p>
          With tailored assistance and easy access to key services, we ensure
          you can focus on what truly matters — finding your ideal home.
        </p>
        <div className="services-container">
          {services.map((service, i) => {
            return (
              <div key={i} className={service.className}>
                <img className="service-image" src={service.imgSRC} />
                <p>{service.text}</p>
                <img className="doodle-line" src={doodleLine} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopProperty;
