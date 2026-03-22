import { config } from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

// Load .env from backend root
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
config({ path: path.resolve(__dirname, '.env') });

async function testConnection() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    console.log('MONGO_URI exists:', !!process.env.MONGO_URI);
    console.log('MONGO_URI starts with:', process.env.MONGO_URI?.substring(0, 20) + '...');

    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI not found in .env');
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected successfully');

    // Test insert/read
    const TestSchema = new mongoose.Schema({ name: String });
    const Test = mongoose.model('Test', TestSchema);
    
    const doc = await Test.create({ name: 'connection test', timestamp: new Date() });
    console.log('✅ Insert successful:', doc._id);

    const found = await Test.findById(doc._id);
    console.log('✅ Read successful:', found?.name);

    await mongoose.connection.close();
    console.log('✅ All tests passed!');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();
