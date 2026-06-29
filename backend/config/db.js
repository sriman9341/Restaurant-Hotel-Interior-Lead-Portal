const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || (
      process.env.NODE_ENV === 'production'
        ? ''
        : 'mongodb://127.0.0.1:27017/glory_simon_interiors'
    );

    if (!mongoURI) {
      throw new Error('MONGODB_URI is required in production');
    }

    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
