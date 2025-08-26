import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p className="footer-text">
            © 2025 Global Stitches.co. All Rights Reserved.
          </p>
          <div className="social-icons">
            <a href="#" className="social-icon" aria-label="Facebook">
              📘
            </a>
            <a href="#" className="social-icon" aria-label="Instagram">
              📷
            </a>
            <a href="#" className="social-icon" aria-label="Twitter">
              🐦
            </a>
            <a href="#" className="social-icon" aria-label="LinkedIn">
              💼
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;