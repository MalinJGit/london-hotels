import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

function Navbar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    setIsLoggedIn(true);
    navigate("/logged-in");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
      <li style={styles.navItem}>
          <Link to="/" style={styles.link}>Home</Link>
        </li>

        {!isLoggedIn && (
          <>
            <li style={styles.navItem}>
              <a
                href="#"
                style={styles.link}
                onClick={(e) => {
                  e.preventDefault();
                  setShowLoginModal(true);
                } }
              >
                Log in
              </a>
            </li>
            <li style={styles.navItem}>
              <a href="/signup" style={styles.link}>
                Create account
              </a>
            </li>
          </>
        )}
        {isLoggedIn && (
          <>
            <li style={styles.navItem}>
              <a
                href="#"
                style={styles.link}
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                } }
              >
                Log out
              </a>
            </li>
            <li style={styles.navItem}>
              <a href="/favorites" style={styles.link}>
                Favorites
              </a>
            </li>
          </>
        )}
        <li style={styles.navItem}>
          <a href="/about" style={styles.link}>
            About us
          </a>
        </li>
      </ul>

      {showLoginModal && (
        <div style={styles.modal} onClick={() => setShowLoginModal(false)}>
          <div
            style={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
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
    </nav>
  );
}

const styles: Record<string, React.CSSProperties> = {
  navbar: {
    backgroundColor: "#282c34",
    padding: "1rem",
    borderBottom: "1px solid #ddd",
  },
  navList: {
    listStyleType: "none",
    display: "flex",
    justifyContent: "space-around",
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: "0 10px",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontWeight: "bold",
  },
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    position: "relative",
    width: "90%",
    maxWidth: "400px",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
  },
};

export default Navbar;