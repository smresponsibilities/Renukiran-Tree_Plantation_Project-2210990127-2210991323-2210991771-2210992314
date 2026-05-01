import mongoose from 'mongoose';

const NGO_MONGODB_URI = process.env.MONGODB_URI;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let ngo_cached = (global as any).mongoose;

if (!ngo_cached) {
  ngo_cached = (global as any).mongoose = { conn: null, promise: null };
}

async function ngo_dbConnect() {
  if (!NGO_MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  if (ngo_cached.conn) {
    return ngo_cached.conn;
  }

  if (!ngo_cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    ngo_cached.promise = mongoose.connect(NGO_MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }
  
  try {
    ngo_cached.conn = await ngo_cached.promise;
  } catch (e) {
    ngo_cached.promise = null;
    throw e;
  }

  return ngo_cached.conn;
}

export default ngo_dbConnect;
