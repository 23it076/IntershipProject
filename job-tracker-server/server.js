require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const swaggerDocs = require('./swagger');  

const app = express();


app.use(express.json());

// API Routes
const userRoutes = require('./routes/userRoutes');
const organizationRoutes = require('./routes/organizationRoutes');
const authRoutes = require('./routes/authRoutes');  // ✅ add this
const adminRoutes = require('./routes/adminRoutes'); 
const providerRoutes = require("./routes/providerRoutes");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));



  app.use(cors({
  origin: "http://localhost:5173",  // frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Register API Routes
app.use('/api/usersForJob', userRoutes);
app.use('/api/organizations', organizationRoutes);
app.use('/api/auth', authRoutes);   // ✅ register here
app.use('/api/admin', adminRoutes); 

app.use("/api/provider", providerRoutes);


// Swagger Docs
swaggerDocs(app);

// Health Check Endpoint
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
