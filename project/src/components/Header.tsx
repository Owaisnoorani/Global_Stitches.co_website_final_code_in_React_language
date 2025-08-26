import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show header on login and dashboard pages
  if (location.pathname === '/login' || location.pathname === '/dashboard') {
    return null;
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    // If we're not on the home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // We're already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleHomeClick = () => {
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleDesignsClick = () => {
    navigate('/designs');
    setIsMenuOpen(false);
  };

  const handleOrderNowClick = () => {
    scrollToSection('order-form');
  };

  const handleAdminClick = () => {
    navigate('/login');
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="nav-brand">
          <h1 className="logo" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
            Global Stitches.co
          </h1>
        </div>
        
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <button 
            className="nav-link"
            onClick={handleHomeClick}
          >
            Home
          </button>
          <button 
            className="nav-link"
            onClick={handleDesignsClick}
          >
            Designs
          </button>
          <button 
            className="nav-link"
            onClick={() => scrollToSection('logo-patches')}
          >
            Logo Patches
          </button>
          <button 
            className="nav-link"
            onClick={() => scrollToSection('clothing-logos')}
          >
            Clothing Logos
          </button>
          <button 
            className="nav-link"
            onClick={() => scrollToSection('pricing')}
          >
            Pricing
          </button>
          <button 
            className="nav-link"
            onClick={handleOrderNowClick}
          >
            Order Now
          </button>
          <button 
            className="nav-link admin-link"
            onClick={handleAdminClick}
          >
            Admin Login
          </button>
        </nav>

        <button 
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;