import mongoose, { Connection } from "mongoose";

// In memory variable to store database connection
let cachedConnection: Connection | null = null;

export async function connectToMongoDB() {
  // If a cached connection exists, return it
  if (cachedConnection) {
    return cachedConnection;
  }
  try {
    const cnx = await mongoose.connect(process.env.MONGODB_URI!);
    // Cache the connection for future use
    cachedConnection = cnx.connection;
    return cachedConnection;
  } catch (error) {
    throw error;
  }
}