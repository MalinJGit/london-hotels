import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import HotelDetails from './pages/HotelDetails';
// import AboutPage from './pages/AboutPage';
import Login from './components/Login';
import SignupForm from './components/Signup';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hotel/:id" element={<HotelDetails />} />
        {/* <Route path="/about" element={<AboutPage />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
