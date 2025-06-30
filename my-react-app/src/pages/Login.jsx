// File: src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login({ setUser }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.token);
      navigate('/');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Login
        </h2>

        <label className="block mb-4">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </label>

        <button
          type="submit"
          className="w-full py-2.5 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <p>Don't have an account? <a href="/register">Register</a></p>

          Login
        </button>
      </form>
    </div>
  );
}
