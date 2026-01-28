import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined in environment variables');
}

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return mongoose;
  await mongoose.connect(MONGODB_URI);
  return mongoose;
};

export default connectDB;