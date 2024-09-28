import express, { Request, Response } from "express";
import { handleSignIn, handleSignUp, handleSignOut } from "../controllers";

const router = express.Router();

// [POST] /api/auth/sign-in
router.post("/auth/sign-in", handleSignIn);

// [GET] /api/auth/sign-in
router.get("/auth/sign-in", (req: Request, res: Response) => {
    res.json({ message: "success" });
});

// [POST] /api/auth/sign-up
router.post("/auth/sign-up", handleSignUp);

// [POST] /api/auth/logout
router.post("/auth/sign-out", handleSignOut);

export default router;
