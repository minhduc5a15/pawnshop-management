import { Request, Response } from "express";
import { User } from "../lib/models";
import { connectDB, database } from "../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const handleSignUp = async (req: Request, res: Response) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        username,
        password: hashedPassword,
        email,
    });

    await connectDB();
    if (!database) {
        return res.status(500).json({ message: "Error connecting to database" });
    }

    const existingUsername = await database.collection("users").findOne({ username });
    if (existingUsername) {
        return res.status(409).json({ message: "Username already exists" });
    }
    const existingEmail = await database.collection("users").findOne({ email });
    if (existingEmail) {
        return res.status(409).json({ message: "Email already exists" });
    }
    try {
        await newUser.save();
        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error creating user" });
    }
};

// handle [POST] /api/auth/sign-in
export const handleSignIn = async (req: Request, res: Response) => {
    const { username, password } = await req.body;
    console.log({
        username,
        password,
    });
    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    connectDB();
    if (!database) {
        return res.status(500).json({ message: "Error connecting to database" });
    }

    const user = await database.collection("users").findOne({ username });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ message: "username or password is incorrect" });
    }

    if (!JWT_SECRET) {
        return res.status(500).json({ message: "JWT_SECRET is not set" });
    }
    const { password: hashedPassword, ...userData } = user;
    const token = jwt.sign({ ...userData }, JWT_SECRET, { expiresIn: "1h" });

    return res.status(200).json({ ...userData, token });
};

// handle [POST] /api/auth/sign-out
export const handleSignOut = async (req: Request, res: Response) => {
    res.clearCookie("authToken");
    return res.status(200).json({ message: "Sign out successful" });
};
