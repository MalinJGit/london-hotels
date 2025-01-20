import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
// import AboutPage from './pages/AboutPage';
import Login from './components/Login';
import SignupForm from './components/Signup';
import LoggedIn from './pages/LoggedIn';
import Favorites from './pages/Favorites';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/about" element={<AboutPage />} /> */}
        <Route path="/login" element={<Login onLoginSuccess={function (): void {
          throw new Error('Function not implemented.');
        } } />} />
        <Route path="/logged-in" element={<LoggedIn />} />
        <Route path="/favorites" element={<Favorites favoriteHotels={[]} favorites={[]} onFavorite={function (hotelId: number): void {
          throw new Error('Function not implemented.');
        } } />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;