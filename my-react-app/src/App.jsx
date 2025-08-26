import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; // Import context

// Import Pages
import Dashboard from './pages/Dashboard';
import LandingPage from "./pages/LandingPage";
import AddExperience from './pages/AddExperience';
import EditExperience from './pages/EditExperience';
import AdminDashboard from "./pages/AdminDashboard";
import ProviderDashboard from "./pages/ProviderDashboard";
import Login from './pages/Login';
import Register from './pages/Register';

// Import Components
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

// This component defines the routes
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* --- Protected Routes --- */}

      {/* Routes for standard users (and admins can also access them) */}
      <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<AddExperience />} />
        <Route path="/edit/:id" element={<EditExperience />} />
      </Route>

      {/* Route ONLY for providers */}
      <Route element={<ProtectedRoute allowedRoles={['provider']} />}>
        <Route path="/provider" element={<ProviderDashboard />} />
      </Route>

      {/* Route ONLY for admins */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      {/* If any other path is visited, redirect to home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

// Main App component wraps everything with the AuthProvider
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
};

export default App;