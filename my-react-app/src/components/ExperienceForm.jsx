// src/components/ExperienceForm.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ExperienceForm = ({ mode, id }) => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    isCurrentJob: false,
  });

  const navigate = useNavigate();

  // ✅ get token
  const token = localStorage.getItem("token");

  // ✅ axios config
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // ✅ Fetch data if editing
  useEffect(() => {
    if (mode === "edit" && id) {
      axios
        .get(`http://localhost:5000/api/experience/${id}`, axiosConfig)
        .then((res) => {
          const data = res.data;
          setFormData({
            ...data,
            startDate: data.startDate ? data.startDate.split("T")[0] : "",
            endDate: data.endDate ? data.endDate.split("T")[0] : "",
          });
        })
        .catch((err) => console.error("Error fetching experience:", err));
    }
  }, [mode, id]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ✅ Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      endDate: formData.isCurrentJob ? null : formData.endDate,
    };

    if (mode === "add") {
      axios
        .post("http://localhost:5000/api/experience", submitData, axiosConfig)
        .then(() => navigate("/dashboard"))
        .catch((err) => console.error("Error adding experience:", err));
    } else if (mode === "edit") {
      axios
        .put(
          `http://localhost:5000/api/experience/${id}`,
          submitData,
          axiosConfig
        )
        .then(() => navigate("/dashboard"))
        .catch((err) => console.error("Error updating experience:", err));
    }
  };

  // 🎨 Improved Styles
  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      fontFamily: "Inter, sans-serif",
    },
    wrapper: {
      width: "100%",
      maxWidth: "650px",
      animation: "fadeIn 0.6s ease-in-out",
    },
    header: {
      textAlign: "center",
      marginBottom: "2rem",
    },
    title: {
      fontSize: "2.25rem",
      fontWeight: "700",
      color: "white",
      marginBottom: "0.5rem",
      letterSpacing: "-0.5px",
    },
    subtitle: {
      color: "rgba(255, 255, 255, 0.85)",
      fontSize: "1rem",
    },
    formContainer: {
      background: "white",
      padding: "2rem 2.5rem",
      borderRadius: "1.25rem",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
    row: {
      display: "flex",
      gap: "1rem",
      marginBottom: "1.5rem",
    },
    inputGroup: {
      flex: 1,
    },
    inputGroupFull: {
      marginBottom: "1.5rem",
    },
    label: {
      display: "block",
      fontSize: "0.9rem",
      fontWeight: "600",
      color: "#374151",
      marginBottom: "0.5rem",
    },
    input: {
      width: "100%",
      padding: "0.85rem 1rem",
      background: "#f9fafb",
      border: "1px solid #d1d5db",
      borderRadius: "0.65rem",
      fontSize: "1rem",
      outline: "none",
      transition: "all 0.2s ease",
    },
    textarea: {
      width: "100%",
      padding: "0.85rem 1rem",
      background: "#f9fafb",
      border: "1px solid #d1d5db",
      borderRadius: "0.65rem",
      fontSize: "1rem",
      minHeight: "120px",
      resize: "vertical",
      outline: "none",
      transition: "all 0.2s ease",
    },
    checkboxContainer: {
      display: "flex",
      alignItems: "center",
      marginBottom: "1.5rem",
      gap: "0.5rem",
    },
    checkbox: {
      width: "1.1rem",
      height: "1.1rem",
      accentColor: "#6a11cb",
      cursor: "pointer",
    },
    checkboxLabel: {
      fontSize: "0.95rem",
      fontWeight: "500",
      color: "#374151",
      cursor: "pointer",
    },
    buttonContainer: {
      display: "flex",
      gap: "1rem",
    },
    button: {
      flex: 1,
      padding: "0.85rem 1rem",
      background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
      color: "white",
      border: "none",
      borderRadius: "0.65rem",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.25s ease",
    },
    cancelButton: {
      flex: 1,
      padding: "0.85rem 1rem",
      background: "#9ca3af",
      color: "white",
      border: "none",
      borderRadius: "0.65rem",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.25s ease",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <h1 style={styles.title}>
            {mode === "add" ? "Add Experience" : "Edit Experience"}
          </h1>
          <p style={styles.subtitle}>
            {mode === "add"
              ? "Share your professional experience"
              : "Update your experience details"}
          </p>
        </div>

        <div style={styles.formContainer}>
          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Job Title & Company */}
            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Job Title</label>
                <input
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="Enter job title"
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Company</label>
                <input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  style={styles.input}
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div style={styles.inputGroupFull}>
              <label style={styles.label}>Location</label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter location (optional)"
                style={styles.input}
              />
            </div>

            {/* Start & End Dates */}
            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  style={styles.input}
                  disabled={formData.isCurrentJob}
                />
              </div>
            </div>

            {/* Checkbox */}
            <div style={styles.checkboxContainer}>
              <input
                type="checkbox"
                id="isCurrentJob"
                name="isCurrentJob"
                checked={formData.isCurrentJob}
                onChange={handleChange}
                style={styles.checkbox}
              />
              <label htmlFor="isCurrentJob" style={styles.checkboxLabel}>
                I currently work here
              </label>
            </div>

            {/* Description */}
            <div style={styles.inputGroupFull}>
              <label style={styles.label}>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your role and achievements..."
                style={styles.textarea}
              />
            </div>

            {/* Buttons */}
            <div style={styles.buttonContainer}>
              <button
                type="button"
                style={styles.cancelButton}
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </button>
              <button type="submit" style={styles.button}>
                {mode === "add" ? "Add" : "Update"} Experience
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExperienceForm;
