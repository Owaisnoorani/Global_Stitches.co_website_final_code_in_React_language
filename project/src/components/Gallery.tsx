import React from 'react';

interface GalleryProps {
  id: string;
  title: string;
  onImageClick: (imageSrc: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({ id, title, onImageClick }) => {
  // Use your actual design images
  const galleryImages = [
    '/35.jpg',
    '/33.jpg', 
    '/29.jpg',
    '/37.jpg',
    '/19.jpg'
  ];

  return (
    <section id={id} className="gallery">
      <div className="container">
        <h2 className="section-title">{title}</h2>
        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <div 
              key={index} 
              className="gallery-item"
              onClick={() => onImageClick(image)}
            >
              <img 
                src={image} 
                alt={`Embroidery design ${index + 1}`}
                loading="lazy"
                onError={(e) => {
                  console.error(`Failed to load image: ${image}`);
                  // Fallback to a placeholder or hide the image
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="gallery-overlay">
                <span className="gallery-icon">🔍</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;