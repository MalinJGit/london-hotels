import React from 'react';

interface HeaderProps {
  image1: string;
  image2: string;
  image3: string;
}

const Header: React.FC<HeaderProps> = ({ image1, image2, image3 }) => {
  return (
    <div className="header">
      <div className="header-images">
        <img
          className="header-image"
          src={image1}
          alt="Image 1"
          style={{ width: '455px', height: '300px', objectFit: 'cover' }}
        />
        <img
          className="header-image"
          src={image2}
          alt="Image 2"
          style={{ width: '455px', height: '300px', objectFit: 'cover' }}
        />
        <img
          className="header-image"
          src={image3}
          alt="Image 3"
          style={{ width: '455px', height: '300px', objectFit: 'cover' }}
        />
      </div>
    </div>
  );
};

export default Header;
