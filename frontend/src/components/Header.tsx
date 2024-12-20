import React from 'react';
import '../styles/Header-style.css';

interface HeaderProps {
  image1: string;
  image2: string;
  image3: string;
}

const Header: React.FC<HeaderProps> = ({ image1, image2, image3 }) => {
  return (
    <div className="header">
      <div className="header-images">
        <img className="header-image" src={image1} alt="Image 1" />
        <img className="header-image" src={image2} alt="Image 2" />
        <img className="header-image" src={image3} alt="Image 3" />
      </div>
    </div>
  );
};

export default Header;