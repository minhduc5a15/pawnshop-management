import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access Denied" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: "Invalid token" });
        }

        console.log(decoded);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
};

export default authMiddleware;