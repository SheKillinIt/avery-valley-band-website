import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import axios from 'axios';
import './App.css';

// Pages & Components
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import BookingForm from './pages/BookingForm';
import Gallery from './pages/Gallery';
import MerchStore from './pages/MerchStore';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

function App() {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuth({ token });
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setAuth({ token });
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/merch" element={<MerchStore />} />
          <Route path="/admin" element={auth ? <AdminDashboard /> : <Navigate to="/login" />} />
        </Routes>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
