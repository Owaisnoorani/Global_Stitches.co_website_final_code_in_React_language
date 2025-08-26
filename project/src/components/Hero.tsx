import React from 'react';

interface HeroProps {
  onOrderNowClick: () => void;
  onViewGalleryClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOrderNowClick, onViewGalleryClick }) => {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Premium Embroidery Services Worldwide
          </h1>
          <p className="hero-subtitle">
            Professional logo patches and embroidery designs for businesses, 
            brands, and organizations across the globe.
          </p>
          <div className="hero-buttons">
            <button 
              className="btn btn-primary"
              onClick={onOrderNowClick}
            >
              Order Now
            </button>
            <button 
              className="btn btn-secondary"
              onClick={onViewGalleryClick}
            >
              View Gallery
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;