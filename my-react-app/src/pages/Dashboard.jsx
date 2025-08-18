// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ExperienceCard from "../components/ExperienceCard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [experiences, setExperiences] = useState([]);
  const navigate = useNavigate();

  // Fetch experiences when page loads
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/experience", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setExperiences(res.data))
      .catch((err) =>
        console.error("❌ Error fetching experiences:", err.response || err)
      );
  }, []);

  // Handle delete
  const handleDelete = (id) => {
    const token = localStorage.getItem("token");

    if (window.confirm("Are you sure you want to delete this experience?")) {
      axios
        .delete(`http://localhost:5000/api/experience/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setExperiences((prev) => prev.filter((exp) => exp._id !== id));
        })
        .catch((err) =>
          console.error("❌ Error deleting experience:", err.response || err)
        );
    }
  };

  // --- styles ---
  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1e3c72, #2a5298)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
    },
    wrapper: {
      width: "100%",
      maxWidth: "1200px",
      background: "rgba(255, 255, 255, 0.1)",
      borderRadius: "16px",
      padding: "40px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
      backdropFilter: "blur(12px)",
    },
    header: {
      textAlign: "center",
      marginBottom: "40px",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      color: "#fff",
      marginBottom: "10px",
    },
    subtitle: {
      fontSize: "1.2rem",
      color: "rgba(255,255,255,0.8)",
      marginBottom: "20px",
    },
    addButton: {
      padding: "12px 24px",
      background: "rgba(255,255,255,0.2)",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "0.3s ease",
    },
    contentContainer: {
      marginTop: "20px",
    },
    emptyState: {
      textAlign: "center",
      padding: "60px 20px",
      color: "#fff",
    },
    emptyIcon: {
      fontSize: "3rem",
      marginBottom: "20px",
    },
    emptyTitle: {
      fontSize: "1.8rem",
      marginBottom: "10px",
    },
    emptyText: {
      fontSize: "1rem",
      marginBottom: "20px",
      opacity: 0.8,
    },
    emptyButton: {
      padding: "10px 20px",
      background: "rgba(255,255,255,0.3)",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "0.3s ease",
    },
    experienceGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* Header Section */}
        <div style={styles.header}>
          <h1 style={styles.title}>Job Experiences</h1>
          <p style={styles.subtitle}>Manage your professional journey</p>
          <button
            style={styles.addButton}
            onClick={() => navigate("/add")}
            onMouseOver={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.3)";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.2)";
              e.target.style.transform = "scale(1)";
            }}
          >
            ✨ Add New Experience
          </button>
        </div>

        {/* Content Section */}
        <div style={styles.contentContainer}>
          {experiences.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>💼</div>
              <h3 style={styles.emptyTitle}>No experiences yet</h3>
              <p style={styles.emptyText}>
                Start building your professional portfolio by adding your first
                job experience.
              </p>
              <button
                style={styles.emptyButton}
                onClick={() => navigate("/add")}
                onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
              >
                Add Your First Experience
              </button>
            </div>
          ) : (
            <div style={styles.experienceGrid}>
              {experiences.map((exp) => (
                <ExperienceCard
                  key={exp._id}
                  experience={exp}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
