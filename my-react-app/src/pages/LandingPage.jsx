// src/pages/LandingPage.jsx
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function LandingPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // used only to show the banner

  const carouselSlides = [
    { icon: "🔑", title: "Login", desc: "Access your account securely with JWT authentication." },
    { icon: "📝", title: "Register", desc: "Create a new account and start tracking your jobs today." },
    { icon: "➕", title: "Add Job", desc: "Add your job experiences with company name, role, and duration." },
    { icon: "✏️", title: "Edit Job", desc: "Update job details whenever necessary." },
    { icon: "🗑️", title: "Delete Job", desc: "Remove job records that are no longer relevant." },
    { icon: "📊", title: "Dashboard", desc: "View and manage all your job experiences in one place." },
  ];

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: "1rem",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    header: {
      width: "100%",
      textAlign: "center",
      fontSize: "2.5rem",
      fontWeight: "bold",
      color: "white",
      padding: "1rem 0",
      marginBottom: "1rem",
      textShadow: "1px 1px 4px rgba(0,0,0,0.3)"
    },
    signedInBanner: {
      width: "100%",
      maxWidth: "900px",
      background: "rgba(255,255,255,0.95)",
      borderRadius: "0.75rem",
      padding: "0.75rem 1rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "0.75rem",
      boxShadow: "0 10px 20px -5px rgba(0,0,0,0.15)",
      marginBottom: "1rem"
    },
    bannerText: { color: "#374151", fontWeight: 600 },
    bannerActions: { display: "flex", gap: "0.5rem" },
    smallBtn: {
      padding: "0.5rem 0.875rem",
      borderRadius: "0.5rem",
      fontWeight: 600,
      border: "none",
      cursor: "pointer"
    },
    primarySmall: { background: "#0ea5e9", color: "white" },
    ghostSmall: { background: "white", color: "#334155", border: "1px solid #cbd5e1" },

    carouselContainer: { width: "100%", maxWidth: "800px", marginBottom: "2rem" },
    card: {
      background: "rgba(255,255,255,0.95)",
      padding: "2rem",
      borderRadius: "1rem",
      boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
      backdropFilter: "blur(10px)",
      textAlign: "center",
      transition: "transform 0.3s"
    },
    icon: { fontSize: "4rem", marginBottom: "1rem" },
    title: { fontSize: "1.8rem", fontWeight: 700, marginBottom: "0.5rem", color: "#333" },
    desc: { color: "#555", fontSize: "1rem" },

    buttonRow: { display: "flex", justifyContent: "center", flexWrap: "wrap", marginBottom: "2rem", gap: "0.75rem" },
    button: {
      padding: "0.75rem 2rem",
      borderRadius: "0.75rem",
      fontWeight: 600,
      cursor: "pointer",
      transition: "transform 0.2s"
    },
    loginButton: { background: "#667eea", color: "white", border: "none" },
    registerButton: { background: "white", color: "#764ba2", border: "2px solid #764ba2" },

    footer: { textAlign: "center", marginTop: "2rem", fontSize: "0.875rem", color: "rgba(255,255,255,0.8)" }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>🚀 Job Experience Tracker</header>

      {/* If already logged in, show a banner instead of hijacking the Login/Register buttons */}
      {token && (
        <div style={styles.signedInBanner}>
          <span style={styles.bannerText}>You’re already signed in.</span>
          <div style={styles.bannerActions}>
            <button
              style={{ ...styles.smallBtn, ...styles.primarySmall }}
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </button>
            <button
              style={{ ...styles.smallBtn, ...styles.ghostSmall }}
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            >
              Switch account
            </button>
          </div>
        </div>
      )}

      <div style={styles.carouselContainer}>
        <Carousel
          autoPlay
          infiniteLoop
          interval={3000}
          showThumbs={false}
          showStatus={false}
          showIndicators
          showArrows
        >
          {carouselSlides.map((slide, idx) => (
            <div
              key={idx}
              style={styles.card}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div style={styles.icon}>{slide.icon}</div>
              <h2 style={styles.title}>{slide.title}</h2>
              <p style={styles.desc}>{slide.desc}</p>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Action buttons — ALWAYS go to their pages, no token checks here */}
      <div style={styles.buttonRow}>
        <button
          style={{ ...styles.button, ...styles.loginButton }}
          onClick={() => navigate("/login")}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Login
        </button>

        <button
          style={{ ...styles.button, ...styles.registerButton }}
          onClick={() => navigate("/register")}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Register
        </button>
      </div>

      <footer style={styles.footer}>
        © {new Date().getFullYear()} Job Experience Tracker. Secure login with end-to-end encryption
      </footer>
    </div>
  );
}
