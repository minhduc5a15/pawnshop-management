import { Router } from "express";
import authMiddleware from "../middlewares";
import { getTransactions, createTransaction, getTransactionById, deleteTransaction } from "../controllers";

const router = Router();

// router.use("/transactions", authMiddleware);

// [GET] /api/transactions
router.get("/transactions", getTransactions);

// [GET] /api/transaction/:id
router.get("/transactions/:id", getTransactionById);

// [POST] /api/transaction/create
router.post("/transactions", createTransaction);

// [DELETE] /api/transactions/:id
router.delete("/transactions/:id", deleteTransaction);

export default router;
