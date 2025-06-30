// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddExperience from './pages/AddExperience';
import EditExperience from './pages/EditExperience';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add" element={<AddExperience />} />
        <Route path="/edit/:id" element={<EditExperience />} />
      </Routes>
    </Router>
  );
};

export default App;