// src/components/ExperienceForm.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ExperienceForm.css';

const ExperienceForm = ({ mode, id }) => {
  const [formData, setFormData] = useState({ title: '', company: '', description: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (mode === 'edit' && id) {
      axios.get(`http://localhost:5000/api/experience/${id}`)
        .then(res => setFormData(res.data))
        .catch(err => console.error(err));
    }
  }, [mode, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'add') {
      axios.post('http://localhost:5000/api/experience', formData)
        .then(() => navigate('/'))
        .catch(err => console.error(err));
    } else if (mode === 'edit') {
      axios.put(`http://localhost:5000/api/experience/${id}`, formData)
        .then(() => navigate('/'))
        .catch(err => console.error(err));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="experience-form">
      <input name="title" value={formData.title} onChange={handleChange} placeholder="Job Title" required />
      <input name="company" value={formData.company} onChange={handleChange} placeholder="Company" required />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
      <button type="submit">{mode === 'add' ? 'Add' : 'Update'} Experience</button>
    </form>
  );
};

export default ExperienceForm;
