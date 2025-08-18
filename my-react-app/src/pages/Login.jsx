// File: src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Login({ setUser }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);

      localStorage.setItem('token', res.data.token);
      setUser(res.data.token);

      navigate('/add');
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
      alert('Login failed. Please check your credentials.');
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
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    wrapper: {
      width: '100%',
      maxWidth: '400px'
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem'
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '0.5rem'
    },
    subtitle: {
      color: 'rgba(255, 255, 255, 0.8)'
    },
    formContainer: {
      background: 'rgba(255, 255, 255, 0.95)',
      padding: '2rem',
      borderRadius: '1rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)'
    },
    form: {
      display: 'flex',
      flexDirection: 'column'
    },
    inputGroup: {
      marginBottom: '1.5rem'
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '0.5rem'
    },
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
    registerLink: {
      textAlign: 'center',
      fontSize: '0.875rem',
      color: '#6b7280'
    },
    link: {
      color: '#667eea',
      textDecoration: 'none',
      fontWeight: '500'
    },
    footer: {
      textAlign: 'center',
      marginTop: '2rem'
    },
    footerText: {
      fontSize: '0.75rem',
      color: 'rgba(255, 255, 255, 0.6)'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <h1 style={styles.title}>Welcome Back</h1>
          <p style={styles.subtitle}>Please sign in to your account</p>
        </div>

        <div style={styles.formContainer}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                style={styles.input}
                required
              />
            </div>

            <button
              type="submit"
              style={styles.button}
              onMouseOver={(e) => (e.target.style.transform = 'scale(1.02)')}
              onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
            >
              Sign In
            </button>

            <div style={styles.registerLink}>
              <p>
                Don&apos;t have an account?{' '}
                <Link to="/register" style={styles.link}>
                  Create one here
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>Secure login with end-to-end encryption</p>
        </div>
      </div>
    </div>
  );
}
