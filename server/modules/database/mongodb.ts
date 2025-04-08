import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get MongoDB credentials from environment variables
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CLUSTER = process.env.DB_CLUSTER || 'cluster0.uzob572.mongodb.net';

// MongoDB connection string with proper URL encoding for password special characters
const MONGODB_URI = process.env.MONGODB_URI || 
  (DB_USER && DB_PASSWORD ? 
    `mongodb+srv://${DB_USER}:${encodeURIComponent(DB_PASSWORD)}@${DB_CLUSTER}/?retryWrites=true&w=majority` : 
    null);

// Debug MongoDB connection parameters (without exposing full password)
console.log('MongoDB Connection Info:', {
  uriProvided: !!process.env.MONGODB_URI,
  userProvided: !!DB_USER,
  passwordProvided: !!DB_PASSWORD,
  clusterProvided: !!DB_CLUSTER,
  connectionStringType: typeof MONGODB_URI
});

if (!MONGODB_URI) {
  console.error('ERROR: MongoDB connection credentials not provided. Set MONGODB_URI or DB_USER and DB_PASSWORD environment variables.');
}

// Create a connection to MongoDB
async function connectToDatabase(): Promise<typeof mongoose> {
  try {
    // Set strict query to false to avoid deprecation warnings
    mongoose.set('strictQuery', false);
    
    // Add defensive check to ensure MONGODB_URI is a string
    if (!MONGODB_URI || typeof MONGODB_URI !== 'string') {
      throw new Error(`Invalid MongoDB URI: ${typeof MONGODB_URI}. Check your environment variables.`);
    }
    
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