// src/components/ExperienceCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ExperienceCard.css';


const ExperienceCard = ({ experience, onDelete }) => {
  const navigate = useNavigate();
  return (
    <div className="experience-card">
      <h3>{experience.title}</h3>
      <p>{experience.company}</p>
      <p>{experience.description}</p>
      <div className="btn-group">
        <button onClick={() => navigate(`/edit/${experience._id}`)}>Edit</button>
        <button onClick={() => onDelete(experience._id)} className="delete">Delete</button>
      </div>
    </div>
  );
};





export default ExperienceCard;