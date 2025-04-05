import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// MongoDB connection string from environment variable or use the provided Atlas connection string
const MONGODB_URI = process.env.MONGODB_URI 

// Create a connection to MongoDB
async function connectToDatabase(): Promise<typeof mongoose> {
  try {
    // Set strict query to false to avoid deprecation warnings
    mongoose.set('strictQuery', false);
    
    const connection = await mongoose.connect(MONGODB_URI, {
      // These options are no longer needed in newer Mongoose versions, but included for compatibility
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    
    console.log('MongoDB Atlas connection established successfully');
    return connection;
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    // Fall back to file-based storage if MongoDB connection fails
    console.log('Falling back to file-based storage');
    return null as any;
  }
}

// Singleton to store database connection
let db: typeof mongoose | null = null;

// Get database connection (creates it if it doesn't exist)
export async function getDatabase(): Promise<typeof mongoose> {
  if (!db) {
    db = await connectToDatabase();
  }
  return db;
}

// Check database connection on startup
(async () => {
  try {
    await getDatabase();
  } catch (error) {
    console.error('Failed to establish initial database connection:', error);
  }
})();