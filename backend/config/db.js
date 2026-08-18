import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonDbPath = path.join(__dirname, '../db.json');

export let isMemoryDb = false;
export let jsonStore = { users: [], products: [], orders: [] };

export const loadJsonDb = () => {
  if (fs.existsSync(jsonDbPath)) {
    try {
      const data = fs.readFileSync(jsonDbPath, 'utf-8');
      jsonStore = JSON.parse(data);
    } catch (e) {
      jsonStore = { users: [], products: [], orders: [] };
    }
  } else {
    saveJsonDb();
  }
};

export const saveJsonDb = () => {
  try {
    fs.writeFileSync(jsonDbPath, JSON.stringify(jsonStore, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error writing to db.json:', e.message);
  }
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 2500, // Timeout fast if no MongoDB running locally
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    isMemoryDb = false;
  } catch (error) {
    console.warn(`⚠️  MongoDB Connection Failed (${error.message}).`);
    console.log(`⚡ Switching to built-in persistent JSON Database (backend/db.json)...`);
    isMemoryDb = true;
    loadJsonDb();
  }
};

export default connectDB;
