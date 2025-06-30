// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExperienceCard from '../components/ExperienceCard';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [experiences, setExperiences] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/experience')
      .then(res => setExperiences(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      axios.delete(`http://localhost:5000/api/experience/${id}`)
        .then(() => {
          setExperiences(prev => prev.filter(exp => exp._id !== id));
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="dashboard">
      <h1>Job Experiences</h1>
      <button className="add-btn" onClick={() => navigate('/add')}>Add New Experience</button>
      <div className="experience-list">
        {experiences.map(exp => (
          <ExperienceCard key={exp._id} experience={exp} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};


export default Dashboard;
