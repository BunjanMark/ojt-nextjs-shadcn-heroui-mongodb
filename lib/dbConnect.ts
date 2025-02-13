import mongoose from "mongoose";
import { ConnectOptions } from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("⚠️ MONGODB_URI is not defined in .env file");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function dbConnect() {
  if (cached.conn) return cached.conn;

  try {
    if (!cached.promise) {
      cached.promise = mongoose
        .connect(
          MONGODB_URI as string,
          {
            bufferCommands: false,
            // maxPoolSize: 10,
            // minPoolSize: 5,
          } as ConnectOptions
        )
        .then((mongoose) => mongoose);
    }
    cached.conn = await cached.promise;
    console.log("✅ MongoDB Connected");
    return cached.conn;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    throw new Error("Failed to connect to database");
  }
}

export default dbConnect;
