import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { token } = await req.json();
    const secret = process.env.JWT_SECRET;
    
    if (!secret) {
        throw new Error("JWT_SECRET is not defined");
    }

    return NextResponse.json({ token: jwt.sign({ token }, secret) });
}

