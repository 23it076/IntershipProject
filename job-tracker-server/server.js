require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const swaggerDocs = require('./swagger');  // Ensure swaggerDocs is available

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
const userRoutes = require('./routes/userRoutes');  // Add this route

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Register API Routes
app.use('/api/usersForJob', userRoutes);  // Register the user routes

// Swagger Docs - Register after routes to ensure it works properly
swaggerDocs(app);

// Health Check Endpoint
app.get('/', (req, res) => {
  res.send('Server is running');
});
 // mounts routes under /auth

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
