import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User';
import connectDB from '../config/db';

// Load .env FIRST
dotenv.config();

async function testUser() {
  try {
    // Connect first
    await connectDB();
    
    const user = new User({
      email: `test-${Date.now()}@example.com`,
      password: 'password123'
    });
    
    await user.save();
    console.log('✅ User saved:', user.email);
    
    const valid = await user.comparePassword('password123');
    console.log('✅ Password valid:', valid);
    
    await user.deleteOne();
    console.log('✅ Cleanup done');
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await mongoose.connection.close();
  }
}

testUser();