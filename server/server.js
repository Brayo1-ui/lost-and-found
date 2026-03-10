const express    = require('express');
const mongoose   = require('mongoose');
const cors       = require('cors');
const dotenv     = require('dotenv');
const path       = require('path');
 
dotenv.config();
const app = express();
 
// Middleware
// Middleware
app.use(cors({
  origin: 'http://127.0.0.1:5500',
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
 
// Routes
app.use('/api/auth',  require('./routes/auth'));
app.use('/api/items', require('./routes/items'));
 
// Connect to MongoDB then start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () => console.log('Server running on port 5000'));
  })
  .catch(err => console.error(err));
  
