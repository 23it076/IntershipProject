import React, { useState } from 'react'; // ✅ Must import useState
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddExperience from './pages/AddExperience';
import EditExperience from './pages/EditExperience';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  const [user, setUser] = useState(null); // ✅ this now works

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setUser={setUser} />} /> {/* ✅ prop passed */}
        <Route path="/add" element={<AddExperience />} />
        <Route path="/edit/:id" element={<EditExperience />} />
      </Routes>
    </Router>
  );
};

export default App;
