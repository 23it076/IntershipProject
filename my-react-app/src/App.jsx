import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LandingPage from "./pages/LandingPage";
import AddExperience from './pages/AddExperience';
import EditExperience from './pages/EditExperience';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  const [user, setUser] = useState(null);

  // ✅ check localStorage for token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token }); 
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setUser={setUser} />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/add"
          element={user ? <AddExperience /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit/:id"
          element={user ? <EditExperience /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
