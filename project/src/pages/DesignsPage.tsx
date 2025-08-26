import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Lightbox from '../components/Lightbox';

const DesignsPage: React.FC = () => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Your actual design images
  const designImages = [
    '/35.jpg',
    '/33.jpg', 
    '/29.jpg',
    '/37.jpg',
    '/19.jpg'
  ];

  const openLightbox = (imageSrc: string) => {
    setLightboxImage(imageSrc);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  return (
    <>
      <Header />
      <div className="designs-page">
        <div className="designs-hero">
          <div className="container">
            <h1 className="designs-title">Our Design Portfolio</h1>
            <p className="designs-subtitle">
              Explore our collection of premium embroidery designs and digitized artwork
            </p>
          </div>
        </div>

        <section className="designs-gallery">
          <div className="container">
            <div className="designs-grid">
              {designImages.map((image, index) => (
                <div 
                  key={index} 
                  className="design-item"
                  onClick={() => openLightbox(image)}
                >
                  <img 
                    src={image} 
                    alt={`Design ${index + 1}`}
                    loading="lazy"
                    onError={(e) => {
                      console.error(`Failed to load image: ${image}`);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="design-overlay">
                    <span className="design-icon">🔍</span>
                    <p className="design-text">View Design</p>
                  </div>
                </div>
              ))}
            </div>

            {designImages.length === 0 && (
              <div className="no-designs">
                <div className="no-designs-icon">🎨</div>
                <h3>Designs Coming Soon</h3>
                <p>We're preparing our amazing design portfolio for you!</p>
              </div>
            )}
          </div>
        </section>

        <section className="design-services">
          <div className="container">
            <h2 className="section-title">Our Design Services</h2>
            <div className="services-grid">
              <div className="service-card">
                <div className="service-icon">🎯</div>
                <h3>Logo Digitizing</h3>
                <p>Convert your logo into high-quality embroidery files with precise detail and professional finish.</p>
              </div>
              <div className="service-card">
                <div className="service-icon">🎨</div>
                <h3>Custom Designs</h3>
                <p>Create unique embroidery designs tailored to your specific requirements and brand identity.</p>
              </div>
              <div className="service-card">
                <div className="service-icon">⚡</div>
                <h3>Quick Turnaround</h3>
                <p>Fast delivery options available including same-day service for urgent design requirements.</p>
              </div>
              <div className="service-card">
                <div className="service-icon">🔧</div>
                <h3>Design Editing</h3>
                <p>Modify existing designs, resize, recolor, or make adjustments to meet your specifications.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
      
      {lightboxImage && (
        <Lightbox 
          imageSrc={lightboxImage} 
          onClose={closeLightbox} 
        />
      )}
    </>
  );
};

export default DesignsPage;