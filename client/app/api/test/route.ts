import { NextResponse } from "next/server";
import axios from "axios";
const SERVER_URL = process.env.SERVER_URL;

export async function GET() {
    try {
        const response = await axios.get(`${SERVER_URL}`, {
            // withCredentials: true,
            headers: {
                
            }
        });
        return NextResponse.json(response.data); 
    }
    catch (error) {
        return NextResponse.json(error);
    }
}