// src/pages/EditExperience.jsxx
import React from 'react';
import { useParams } from 'react-router-dom';
import ExperienceForm from '../components/ExperienceForm';
import './FormPage.css';

const EditExperience = () => {
  const { id } = useParams();
  return <ExperienceForm mode="edit" id={id} />;
};

export default EditExperience;