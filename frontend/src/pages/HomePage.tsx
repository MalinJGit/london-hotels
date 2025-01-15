import React, { useState } from 'react';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';
import '../styles/HomePage.css';
import '../styles/Button.css';

const HomePage: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
  };

  return (
    <div className="homepage">
      <header className="homepage-header">
        <Header
          image1="https://cdn.pixabay.com/photo/2021/02/03/00/10/receptionists-5975962_1280.jpg"
          image2="https://cdn.pixabay.com/photo/2016/10/18/09/02/hotel-1749602_1280.jpg"
          image3="https://cdn.pixabay.com/photo/2015/11/21/15/15/telephone-1055044_1280.jpg"
        />
        <h1>Discover the Magic of London</h1>
        <p>London is not just a city; it's an experience. A vibrant mix of history, culture, and modernity, it offers something for everyone. Whether you're wandering through the iconic streets of Westminster, marveling at the grandeur of Buckingham Palace, or exploring the artistic gems in the Tate Modern, London invites you to step into a world where the past meets the future.</p>
        <h2>Your Ideal London Hotel Awaits</h2>
        <p>To make your stay even easier, create an account or log in to explore a curated list of available hotels in London. Once you're logged in, you'll have access to the best rates, availability updates, and a seamless booking experience. Don't miss out on finding your ideal stay in this vibrant, world-class city!</p>

        <div>
          <p>Please log in to see available hotels in London.</p>
          <button className="login-button"
          onClick={() => setShowLoginModal(true)}>Logga in</button>
        </div>

        {showLoginModal && (
          <div style={styles.modal}>
            <div style={styles.modalContent}>
              <button
                style={styles.closeButton}
                onClick={() => setShowLoginModal(false)} 
              >
                &times;
              </button>
              <LoginForm onLoginSuccess={handleLoginSuccess} />
            </div>
          </div>
        )}

<p>Don't have an account? Sign up for free here:</p>

      </header>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    position: 'relative',
    width: '90%',
    maxWidth: '400px',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
  },
};

export default HomePage;