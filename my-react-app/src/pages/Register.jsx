import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData.name, formData.email, formData.password, formData.role);
      alert('Registration successful. Please login.');
      navigate('/login');
    } catch (err) {
      alert('Registration failed. Try a different email.');
      console.error(err);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    wrapper: { width: '100%', maxWidth: '400px' },
    header: { textAlign: 'center', marginBottom: '2rem' },
    title: { fontSize: '2rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' },
    subtitle: { color: 'rgba(255, 255, 255, 0.8)' },
    formContainer: {
      background: 'rgba(255, 255, 255, 0.95)',
      padding: '2rem',
      borderRadius: '1rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)'
    },
    form: { display: 'flex', flexDirection: 'column' },
    inputGroup: { marginBottom: '1.5rem' },
    label: { display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' },
    input: {
      width: '100%',
      padding: '0.75rem 1rem',
      background: '#f9fafb',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      transition: 'all 0.2s',
      outline: 'none',
      boxSizing: 'border-box'
    },
    button: {
      width: '100%',
      padding: '0.75rem 1rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'transform 0.2s',
      marginBottom: '1rem'
    },
    loginLink: { textAlign: 'center', fontSize: '0.875rem', color: '#6b7280' },
    link: { color: '#667eea', textDecoration: 'none', fontWeight: '500' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <h1 style={styles.title}>Create Account</h1>
          <p style={styles.subtitle}>Join us today and get started</p>
        </div>

        <div style={styles.formContainer}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Full Name</label>
              <input type="text" name="name" placeholder="Enter your full name" value={formData.name} onChange={handleChange} style={styles.input} required />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} style={styles.input} required />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input type="password" name="password" placeholder="Create a password" value={formData.password} onChange={handleChange} style={styles.input} required />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Role</label>
              <select name="role" value={formData.role} onChange={handleChange} style={styles.input}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="provider">Provider</option>
              </select>
            </div>

            <button type="submit" style={styles.button}>Create Account</button>

            <div style={styles.loginLink}>
              <p>
                Already have an account?{' '}
                <a href="/login" style={styles.link}>Sign in here</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
