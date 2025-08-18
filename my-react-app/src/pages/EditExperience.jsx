import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditExperience = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [experience, setExperience] = useState({
    jobTitle: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    isCurrentJob: false
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:5000/api/experience/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        setExperience({
          jobTitle: res.data.jobTitle || "",
          company: res.data.company || "",
          location: res.data.location || "",
          startDate: res.data.startDate ? res.data.startDate.slice(0,10) : "",
          endDate: res.data.endDate ? res.data.endDate.slice(0,10) : "",
          description: res.data.description || "",
          isCurrentJob: res.data.isCurrentJob || false
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching experience:", err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setExperience((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.put(`http://localhost:5000/api/experience/${id}`, experience, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate("/dashboard");
    } catch (err) {
      console.error("Error updating experience:", err);
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    card: {
      width: "100%",
      maxWidth: "600px",
      background: "rgba(255,255,255,0.95)",
      padding: "2rem",
      borderRadius: "1rem",
      boxShadow: "0 20px 30px -10px rgba(0,0,0,0.2)",
      backdropFilter: "blur(10px)"
    },
    header: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#333",
      textAlign: "center",
      marginBottom: "1.5rem"
    },
    input: {
      width: "100%",
      padding: "0.75rem 1rem",
      borderRadius: "0.5rem",
      border: "1px solid #ccc",
      marginBottom: "1rem",
      fontSize: "1rem"
    },
    row: {
      display: "flex",
      gap: "1rem",
      marginBottom: "1rem"
    },
    textarea: {
      width: "100%",
      padding: "0.75rem 1rem",
      borderRadius: "0.5rem",
      border: "1px solid #ccc",
      fontSize: "1rem",
      minHeight: "100px",
      marginBottom: "1rem"
    },
    checkboxContainer: {
      display: "flex",
      alignItems: "center",
      marginBottom: "1rem",
      gap: "0.5rem"
    },
    button: {
      width: "100%",
      background: "#667eea",
      color: "white",
      padding: "0.75rem",
      fontWeight: "bold",
      borderRadius: "0.5rem",
      border: "none",
      cursor: "pointer",
      transition: "background 0.3s"
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={{ color: "white", fontSize: "1.25rem" }}>Loading experience...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.header}>✏️ Edit Experience</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="jobTitle"
            value={experience.jobTitle}
            onChange={handleChange}
            placeholder="Job Title"
            style={styles.input}
            required
          />
          <input
            type="text"
            name="company"
            value={experience.company}
            onChange={handleChange}
            placeholder="Company"
            style={styles.input}
            required
          />
          <input
            type="text"
            name="location"
            value={experience.location}
            onChange={handleChange}
            placeholder="Location"
            style={styles.input}
          />
          <div style={styles.row}>
            <input
              type="date"
              name="startDate"
              value={experience.startDate}
              onChange={handleChange}
              style={{ ...styles.input, marginBottom: 0 }}
              required
            />
            {/* disable endDate if current job */}
            <input
              type="date"
              name="endDate"
              value={experience.endDate}
              onChange={handleChange}
              style={{ ...styles.input, marginBottom: 0 }}
              disabled={experience.isCurrentJob}
              required={!experience.isCurrentJob}
            />
          </div>
          <div style={styles.checkboxContainer}>
            <input
              type="checkbox"
              name="isCurrentJob"
              checked={experience.isCurrentJob}
              onChange={handleChange}
              id="currentJob"
            />
            <label htmlFor="currentJob">I currently work here</label>
          </div>
          <textarea
            name="description"
            value={experience.description}
            onChange={handleChange}
            placeholder="Job Description"
            style={styles.textarea}
          />
          <button type="submit" style={styles.button}>
            Update Experience
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditExperience;
