// require('dotenv').config();
// const mongoose = require('mongoose');
// const express = require('express');
// const cors = require('cors');
// const swaggerDocs = require('./swagger');  // Ensure swaggerDocs is available

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // API Routes
// const userRoutes = require('./routes/userRoutes');  // Add this route

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// // Register API Routes
// app.use('/api/usersForJob', userRoutes);  // Register the user routes

// // Swagger Docs - Register after routes to ensure it works properly
// swaggerDocs(app);

// // Health Check Endpoint
// app.get('/', (req, res) => {
//   res.send('Server is running');
// });
//  // mounts routes under /auth

// // Start Server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server listening on http://localhost:${PORT}`);
// });


// File: server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');
const swaggerDocs = require('./swagger');

const app = express();

// Middleware
const cors = require('cors');
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
const userRoutes = require('./routes/userRoutes');     // Other app routes
const authRoutes = require('./routes/authRoutes');     // Auth: login + register

// Mount Routes
app.use('/api/usersForJob', userRoutes);
app.use('/api/auth', authRoutes);                      // 👈 This enables /api/auth/register and /api/auth/login

// Swagger API docs (optional)
swaggerDocs(app);

// Health Check
app.get('/', (req, res) => {
  res.send('✅ Server is running');
});

// Start Server
const PORT = process.env.PORT || 5000; // Ensure this matches frontend axios base URL
app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});
