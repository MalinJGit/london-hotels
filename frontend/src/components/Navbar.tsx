import React, { useState } from "react";
import Login from "../components/Login";

const Navbar: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
  };

  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <a
            href="#"
            style={styles.link}
            onClick={(e) => {
              e.preventDefault();
              setShowLoginModal(true);
            }}
          >
            Logga in
          </a>
        </li>
        <li style={styles.navItem}>
          <a href="/signup" style={styles.link}>
            Skapa konto
          </a>
        </li>
        <li style={styles.navItem}>
          <a href="/about" style={styles.link}>
            Om oss
          </a>
        </li>
      </ul>

      {showLoginModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <button
              style={styles.closeButton}
              onClick={() => setShowLoginModal(false)}
            >
              &times;
            </button>
            <Login onLoginSuccess={handleLoginSuccess} />
          </div>
        </div>
      )}
    </nav>
  );
};

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