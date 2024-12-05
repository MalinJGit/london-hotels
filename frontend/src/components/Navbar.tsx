import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/signup" style={styles.link}>
            Skapa konto
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/login" style={styles.link}>
            Logga in
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/about" style={styles.link}>
            Om oss
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: "#f8f9fa",
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
    color: "#007bff",
    fontWeight: "bold",
  },
};

export default Navbar;