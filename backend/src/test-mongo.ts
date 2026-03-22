import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function testConnection() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('✅ MongoDB connected successfully');

    // Test insert
    const Test = mongoose.model('Test', new mongoose.Schema({ name: String }));
    await Test.create({ name: 'connection test' });
    console.log('✅ Insert successful');

    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
  }
}

testConnection();
