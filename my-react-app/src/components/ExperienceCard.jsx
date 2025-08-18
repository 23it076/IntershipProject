// // src/components/ExperienceCard.jsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const ExperienceCard = ({ experience, onDelete }) => {
//   const navigate = useNavigate();

//   const styles = {
//     card: {
//       background: 'white',
//       borderRadius: '1rem',
//       padding: '1.5rem',
//       boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
//       border: '1px solid rgba(255, 255, 255, 0.2)',
//       transition: 'all 0.3s',
//       height: 'fit-content'
//     },
//     header: {
//       marginBottom: '1rem'
//     },
//     title: {
//       fontSize: '1.25rem',
//       fontWeight: 'bold',
//       color: '#1f2937',
//       marginBottom: '0.5rem',
//       lineHeight: '1.4'
//     },
//     company: {
//       fontSize: '1rem',
//       color: '#667eea',
//       fontWeight: '600',
//       marginBottom: '0.75rem'
//     },
//     description: {
//       fontSize: '0.875rem',
//       color: '#6b7280',
//       lineHeight: '1.5',
//       marginBottom: '1.5rem',
//       display: '-webkit-box',
//       WebkitLineClamp: 3,
//       WebkitBoxOrient: 'vertical',
//       overflow: 'hidden'
//     },
//     buttonGroup: {
//       display: 'flex',
//       gap: '0.75rem'
//     },
//     editButton: {
//       flex: 1,
//       padding: '0.5rem 1rem',
//       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//       color: 'white',
//       border: 'none',
//       borderRadius: '0.5rem',
//       fontSize: '0.875rem',
//       fontWeight: '600',
//       cursor: 'pointer',
//       transition: 'transform 0.2s'
//     },
//     deleteButton: {
//       flex: 1,
//       padding: '0.5rem 1rem',
//       background: '#ef4444',
//       color: 'white',
//       border: 'none',
//       borderRadius: '0.5rem',
//       fontSize: '0.875rem',
//       fontWeight: '600',
//       cursor: 'pointer',
//       transition: 'all 0.2s'
//     }
//   };

//   return (
//     <div
//       style={styles.card}
//       onMouseOver={(e) => {
//         e.currentTarget.style.transform = 'translateY(-4px)';
//         e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
//       }}
//       onMouseOut={(e) => {
//         e.currentTarget.style.transform = 'translateY(0)';
//         e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
//       }}
//     >
//       <div style={styles.header}>
//         <h3 style={styles.title}>{experience.title}</h3>
//         <p style={styles.company}>{experience.company}</p>
//       </div>
      
//       <p style={styles.description}>{experience.description}</p>
      
//       <div style={styles.buttonGroup}>
//         <button
//           onClick={() => navigate(`/edit/${experience._id}`)}
//           style={styles.editButton}
//           onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
//           onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
//         >
//           Edit
//         </button>
//         <button
//           onClick={() => onDelete(experience._id)}
//           style={styles.deleteButton}
//           onMouseOver={(e) => {
//             e.target.style.transform = 'scale(1.02)';
//             e.target.style.background = '#dc2626';
//           }}
//           onMouseOut={(e) => {
//             e.target.style.transform = 'scale(1)';
//             e.target.style.background = '#ef4444';
//           }}
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ExperienceCard;



// src/components/ExperienceCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ExperienceCard = ({ experience, onDelete }) => {
  const navigate = useNavigate();

  const styles = {
    card: {
      background: 'white',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      transition: 'all 0.3s',
      height: 'fit-content'
    },
    header: {
      marginBottom: '1rem'
    },
    title: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '0.5rem',
      lineHeight: '1.4'
    },
    company: {
      fontSize: '1rem',
      color: '#667eea',
      fontWeight: '600',
      marginBottom: '0.75rem'
    },
    description: {
      fontSize: '0.875rem',
      color: '#6b7280',
      lineHeight: '1.5',
      marginBottom: '1.5rem',
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    },
    buttonGroup: {
      display: 'flex',
      gap: '0.75rem'
    },
    editButton: {
      flex: 1,
      padding: '0.5rem 1rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'transform 0.2s'
    },
    deleteButton: {
      flex: 1,
      padding: '0.5rem 1rem',
      background: '#ef4444',
      color: 'white',
      border: 'none',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s'
    }
  };

  return (
    <div
      style={styles.card}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
      }}
    >
      <div style={styles.header}>
        {/* Use jobTitle instead of title */}
        <h3 style={styles.title}>{experience.jobTitle}</h3>
        <p style={styles.company}>{experience.company}</p>
      </div>
      
      <p style={styles.description}>{experience.description}</p>
      
      <div style={styles.buttonGroup}>
        <button
          onClick={() => navigate(`/edit/${experience._id}`)}
          style={styles.editButton}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(experience._id)}
          style={styles.deleteButton}
          onMouseOver={(e) => {
            e.target.style.transform = 'scale(1.02)';
            e.target.style.background = '#dc2626';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.background = '#ef4444';
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ExperienceCard;
