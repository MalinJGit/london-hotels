import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/Signup';
import '../styles/Aboutus-styles.css';


const AboutUs: React.FC = () => {
     const [showLoginModal, setShowLoginModal] = useState(false);
      const [showSignupModal, setShowSignupModal] = useState(false);
      const navigate = useNavigate();
    
      const handleLoginSuccess = () => {
        setShowLoginModal(false);
        navigate('/logged-in');
      };
    
      const handleSignupSuccess = () => {
        setShowSignupModal(false);
        navigate('/');
      };

    return (
        <div className="about-us-container">
            <header className="about-us-header">
                <h1>About us</h1>
            </header>

            <section className="about-us-content">
                <p>
                    We are a team of London lovers who know how hard it can be to find suitable hotels. We therefore wanted to create a site where people can easy get information about different hotels and hopefully find a suitable hotels for their needs.
                </p>

                <div>
          <p>Please log in to see available hotels in London.</p>
          <button className="login-button-about"
          onClick={() => setShowLoginModal(true)}>Log in</button>
        </div>

        {showLoginModal && (
          <div className="modal-overlay">
          <div className="modal-content">
            <button className="closeButton" onClick={() => setShowLoginModal(false)}>
              &times;
            </button>
            <LoginForm onLoginSuccess={handleLoginSuccess} />
          </div>
        </div>
      )}

        <div>
          <p>Don't have an account? Sign up for free here:</p>
          <button
            className="signup-button-about"
            onClick={() => setShowSignupModal(true)}
          >
            Create Account
          </button>
        </div>

        {showSignupModal && (
          <div className="modal-overlay">
          <div className="modal-content">
            <button className="closeButton" onClick={() => setShowSignupModal(false)}>
              &times;
            </button>
            <SignupForm onSignupSuccess={handleSignupSuccess} />
          </div>
        </div>
      )}
    </section>
  </div>
);
};

export default AboutUs;