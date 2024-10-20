'use server';

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

let isConnected = false;

if (!MONGODB_URI) {
    throw new Error('MongoDB URI is missing');
}

export const connectDb = async () => {
    if (isConnected) {
        console.log('Already connected to database');
        return mongoose.connection;
    }
    try {
        await mongoose.connect(MONGODB_URI);
        isConnected = true;
        console.log('MongoDB Connected!');
        return mongoose.connection;
    } catch (error) {
        console.error(error);
        return null;
    }
};
