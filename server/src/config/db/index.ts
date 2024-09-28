import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env or .env.local");
}

let database: mongoose.Connection;

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        mongoose.Promise = global.Promise;
        database = mongoose.connection;
        console.log("MongoDB connected");
    } catch (err) {
        console.log(err);
    }
};

export { database };
