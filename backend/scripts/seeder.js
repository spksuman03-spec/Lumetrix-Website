import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import products from '../data/products.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import connectDB, { isMemoryDb, jsonStore, saveJsonDb, loadJsonDb } from '../config/db.js';

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('admin123', salt);
    const userPassword = await bcrypt.hash('user123', salt);

    if (isMemoryDb) {
      loadJsonDb();

      const adminUser = {
        _id: 'usr_admin',
        name: 'Admin User',
        email: 'admin@example.com',
        password: adminPassword,
        isAdmin: true,
        createdAt: new Date().toISOString(),
      };

      const regularUser = {
        _id: 'usr_john',
        name: 'John Doe',
        email: 'john@example.com',
        password: userPassword,
        isAdmin: false,
        createdAt: new Date().toISOString(),
      };

      jsonStore.users = [adminUser, regularUser];

      const sampleProducts = products.map((product, idx) => {
        return {
          ...product,
          _id: 'prd_' + (idx + 1),
          user: adminUser._id,
          reviews: [
            {
              _id: 'rev_' + idx,
              name: 'Jane Smith',
              rating: 5,
              comment: 'Exceptional build quality and fast delivery!',
              user: regularUser._id,
              createdAt: new Date().toISOString(),
            }
          ],
          createdAt: new Date().toISOString(),
        };
      });

      jsonStore.products = sampleProducts;
      jsonStore.orders = [];

      saveJsonDb();
      console.log('✅ Local persistent JSON DB populated successfully!');
      process.exit(0);
    }

    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.create([
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123',
        isAdmin: true,
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'user123',
        isAdmin: false,
      },
    ]);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('✅ MongoDB Data Imported Successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`❌ Error importing data: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    if (isMemoryDb) {
      jsonStore.users = [];
      jsonStore.products = [];
      jsonStore.orders = [];
      saveJsonDb();
      console.log('✅ Persistent JSON DB Wiped!');
      process.exit(0);
    }

    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('✅ MongoDB Data Destroyed!');
    process.exit(0);
  } catch (error) {
    console.error(`❌ Error destroying data: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
