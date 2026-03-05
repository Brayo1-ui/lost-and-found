const mongoose = require('mongoose');

// ========================
// CONNECT TO MONGODB
// ========================
const connectDB = async () => {
  try {

    // Attempt connection using MONGO_URI from .env file
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser:    true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

  } catch (error) {

    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Stops the entire app if DB fails to connect

  }
};

module.exports = connectDB;