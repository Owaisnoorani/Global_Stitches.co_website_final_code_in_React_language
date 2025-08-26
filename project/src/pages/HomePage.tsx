import React, { useState } from 'react';
import Hero from '../components/Hero';
import Gallery from '../components/Gallery';
import Pricing from '../components/Pricing';
import OrderForm from '../components/OrderForm';
import Lightbox from '../components/Lightbox';

const HomePage: React.FC = () => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const openLightbox = (imageSrc: string) => {
    setLightboxImage(imageSrc);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOrderNowClick = () => {
    scrollToSection('order-form');
  };

  const handleViewGalleryClick = () => {
    scrollToSection('logo-patches');
  };

  return (
    <>
      <Hero 
        onOrderNowClick={handleOrderNowClick}
        onViewGalleryClick={handleViewGalleryClick}
      />
      <Gallery 
        id="logo-patches" 
        title="Logo Patches Gallery" 
        onImageClick={openLightbox}
      />
      <Gallery 
        id="clothing-logos" 
        title="Clothing Logos Gallery" 
        onImageClick={openLightbox}
      />
      <Pricing />
      <OrderForm />
      
      {lightboxImage && (
        <Lightbox 
          imageSrc={lightboxImage} 
          onClose={closeLightbox} 
        />
      )}
    </>
  );
};

export default HomePage;