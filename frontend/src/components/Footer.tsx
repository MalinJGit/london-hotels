import React from 'react';
import '../styles/Footer-styles.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>We are dedicated to helping you find the best hotels in London.</p>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: support@londonhotels.com</p>
          <p>Phone: +44 123 456 7890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} London Hotels. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
